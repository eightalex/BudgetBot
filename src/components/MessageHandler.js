export default class MessageHandler {

    constructor() {
        this.wordsSeparator = ', ';
        this.digitsRegex = /([0-9]+([.][0-9]*)?|[.][0-9]+)/;
        this.wordsRegex = /([аАaA-яЯzZ]+ ?)+/;
    }

    /**
     * @param inputMessage {string}
     * @return {{value: number, comment: string}}
     */
    prepareExpense(inputMessage) {
        const valueResult = this.digitsRegex.exec(inputMessage);
        const commentResult = this.wordsRegex.exec(inputMessage);

        const value = valueResult ? parseInt(valueResult[0], 10) : 0;
        const comment = commentResult ? commentResult[0].trim() + ' (' + value + ')' : '';

        return {value, comment};
    }

    /**
     * @param currentValue {number}
     * @param currentComment {string}
     * @return {{value: number, comment: string}}
     */
    prepareUndo(currentValue, currentComment) {
        let comments = currentComment.split(this.wordsSeparator);

        const lastComment = comments.pop();
        const valueResult = this.digitsRegex.exec(lastComment);
        const previousValue = valueResult ? parseInt(valueResult[0], 10) : 0;

        return {
            value: currentValue - previousValue,
            comment: comments.join(this.wordsSeparator)
        };
    }

}