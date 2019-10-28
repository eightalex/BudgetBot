import {REGEX_DIGITS, REGEX_WORDS} from '../constants/Regex';
import {DELIMITER_WORD, DELIMITER_TRANSACTION} from '../constants/Delimiter';

export default class MessageHandler {

    /**
     * @param {NumberHandler} numberHandler
     * @param {StringHandler} stringHandler
     */
    constructor(numberHandler, stringHandler) {
        this.numberHandler = numberHandler;
        this.stringHandler = stringHandler;
    }

    /**
     * @param {string} inputComment
     * @param {number} inputValue
     * @return {string}
     */
    prepareComment(inputComment, inputValue) {
        if (!inputComment) {
            return ''; // TODO add Error
        }

        let comment = this.stringHandler.removeNewLine(inputComment.trim());
        comment = this.stringHandler.capitalize(comment);

        return comment + DELIMITER_WORD + '(' + inputValue + ')';
    }

    /**
     * @param {string} inputMessage
     * @param {boolean} isIncome
     * @return {{value: number, comment: string}}
     */
    prepareTransaction(inputMessage, isIncome) {
        const message = this.stringHandler.removeCommand(inputMessage);
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