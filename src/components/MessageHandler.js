export default class MessageHandler {

    constructor() {
        this.transactionSeparator = ', ';
        this.wordSeparator = ' ';
        this.commandRegex = /^\/[a-z]+/;
        this.digitsRegex = /(-?[0-9]+([.][0-9]*)?|[.][0-9]+)/;
        this.wordsRegex = /([аАaA-яЯzZ]+ ?)+/;
    }

    /**
     * @param inputMessage {string}
     * @return {string}
     */
    removeCommand(inputMessage) {
        return inputMessage.replace(this.commandRegex, '');
    }

    /**
     * @param inputValue {string}
     * @param makeNegative {boolean}
     * @return {number}
     */
    prepareValue(inputValue, makeNegative = false) {
        const value = parseFloat(inputValue);

        if (!value) {
            return 0;
        }

        if (makeNegative) {
            return value - (value * 2);
        } else {
            return value;
        }
    }

    /**
     * @param inputComment {string}
     * @param inputValue {number}
     * @return {string}
     */
    prepareComment(inputComment, inputValue) {
        let comment = inputComment.trim();

        if (!comment) {
            return '';
        }

        comment = comment.charAt(0).toUpperCase() + comment.slice(1); // capitalize

        return comment + this.wordSeparator + '(' + inputValue + ')';
    }

    /**
     * @param inputMessage {string}
     * @param isIncome {boolean}
     * @return {{value: number, comment: string}}
     */
    prepareTransaction(inputMessage, isIncome) {
        const message = this.removeCommand(inputMessage);
        const valueResult = this.digitsRegex.exec(message);
        const commentResult = this.wordsRegex.exec(message);

        const value = this.prepareValue(valueResult[0], isIncome);
        const comment = this.prepareComment(commentResult[0], value);

        return {value, comment};
    }

    /**
     * @param currentValue {number}
     * @param currentComment {string}
     * @return {{value: number, comment: string}}
     */
    prepareUndo(currentValue, currentComment) {
        let comments = currentComment.split(this.transactionSeparator);

        const lastComment = comments.pop();
        const valueResult = this.digitsRegex.exec(lastComment);
        const previousValue = this.prepareValue(valueResult[0]);

        return {
            value: currentValue - previousValue,
            comment: comments.join(this.transactionSeparator)
        };
    }

}