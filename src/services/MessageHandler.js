import {REGEX_COMMAND, REGEX_DIGITS, REGEX_NEW_LINE, REGEX_WORDS} from '../constants/Regex';
import {DELIMITER_WORD, DELIMITER_TRANSACTION} from '../constants/Delimiter';

export default class MessageHandler {

    /**
     * @param {NumberHandler} numberHandler
     */
    constructor(numberHandler) {
        this.numberHandler = numberHandler;
    }

    /**
     * @param {string} inputMessage
     * @return {string}
     */
    removeCommand(inputMessage) {
        return inputMessage.replace(REGEX_COMMAND, '');
    }

    /**
     * @param {string} inputComment
     * @return {string}
     */
    removeNewLine(inputComment) {
        return inputComment.replace(REGEX_NEW_LINE, DELIMITER_WORD);
    }

    /**
     * @param {string} inputComment
     * @param {number} inputValue
     * @return {string}
     */
    prepareComment(inputComment, inputValue) {
        let comment = this.removeNewLine(inputComment.trim());

        if (!comment) {
            return '';
        }

        comment = comment.charAt(0).toUpperCase() + comment.slice(1); // capitalize

        return comment + DELIMITER_WORD + '(' + inputValue + ')';
    }

    /**
     * @param {string} inputMessage
     * @param {boolean} isIncome
     * @return {{value: number, comment: string}}
     */
    prepareTransaction(inputMessage, isIncome) {
        const message = this.removeCommand(inputMessage);
        const valueResult = REGEX_DIGITS.exec(message);
        const commentResult = REGEX_WORDS.exec(message);

        const value = this.numberHandler.prepareValue(valueResult[0], isIncome);
        const comment = this.prepareComment(commentResult[0], value);

        return {value, comment};
    }

    /**
     * @param {number} currentValue
     * @param {string} currentComment
     * @return {{value: number, comment: string}}
     */
    prepareUndo(currentValue, currentComment) {
        let comments = currentComment.split(DELIMITER_TRANSACTION);

        const lastComment = comments.pop();
        const valueResult = REGEX_DIGITS.exec(lastComment);
        const previousValue = this.numberHandler.prepareValue(valueResult[0]);

        return {
            value: currentValue - previousValue,
            comment: comments.join(DELIMITER_TRANSACTION)
        };
    }

}