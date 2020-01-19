import {REGEX_DIGITS, REGEX_WORDS} from '../../constants/Regex';
import {DELIMITER_WORD, DELIMITER_TRANSACTION, DELIMITER_DASH} from '../../constants/Delimiter';

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
     * @param {string} comment
     * @param {number} value
     * @param {object} options
     * @return {string}
     */
    prepareComment(comment, value, options = {}) {
        if (!comment) {
            return ''; // TODO add Error
        }

        comment = comment.trim();
        comment = this.stringHandler.removeNewLine(comment);
        comment = this.stringHandler.capitalize(comment);

        if (options.isTelegramMessage) {
            comment = this.extendCommentForTelegramMessage(comment, value);
        } else {
            comment = this.extendCommentForSheets(comment, value);
        }

        return comment;
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
        let lastComment = comments.pop();
        let previousValue = this.numberHandler.getValueFromBraces(lastComment);

        return {
            value: currentValue - previousValue,
            comment: comments.join(DELIMITER_TRANSACTION)
        };
    }

    /**
     * @param {string} comment
     * @param {number} value
     * @return {string}
     */
    extendCommentForTelegramMessage(comment, value) {
        return comment
            + DELIMITER_WORD
            + DELIMITER_DASH
            + DELIMITER_WORD
            + value
            + DELIMITER_WORD
            + process.env.CURRENCY_ACRONYM;
    }

    /**
     * @param {string} comment
     * @param {number} value
     * @return {string}
     */
    extendCommentForSheets(comment, value) {
        return comment + DELIMITER_WORD + this.stringHandler.wrapByBraces(value);
    }

}