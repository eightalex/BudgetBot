export default class MessageHandler {

    /**
     * @param {NumberHandler} numberHandler
     */
    constructor(numberHandler) {
        this.numberHandler = numberHandler;
        this.transactionSeparator = ', ';
        this.wordSeparator = ' ';
        this.commandRegex = /^\/[a-z]+/;
        this.digitsRegex = /(-?[0-9]+([.][0-9]*)?|[.][0-9]+)/;
        this.wordsRegex = /([аАaA-яЯzZ]+ ?)+/;
        this.newLineRegex = /\r?\n|\r/;
    }

    /**
     * @param {string} inputMessage
     * @return {string}
     */
    removeCommand(inputMessage) {
        return inputMessage.replace(this.commandRegex, '');
    }

    /**
     * @param {string} inputComment
     * @return {string}
     */
    removeNewLine(inputComment) {
        return inputComment.replace(this.newLineRegex, '');
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

        return comment + this.wordSeparator + '(' + inputValue + ')';
    }

    /**
     * @param {string} inputMessage
     * @param {boolean} isIncome
     * @return {{value: number, comment: string}}
     */
    prepareTransaction(inputMessage, isIncome) {
        const message = this.removeCommand(inputMessage);
        const valueResult = this.digitsRegex.exec(message);
        const commentResult = this.wordsRegex.exec(message);

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
        let comments = currentComment.split(this.transactionSeparator);

        const lastComment = comments.pop();
        const valueResult = this.digitsRegex.exec(lastComment);
        const previousValue = this.numberHandler.prepareValue(valueResult[0]);

        return {
            value: currentValue - previousValue,
            comment: comments.join(this.transactionSeparator)
        };
    }

}