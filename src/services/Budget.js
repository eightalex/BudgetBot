export default class Budget {

    /**
     * @param {SpreadsheetAppAdapter} spreadsheetAppAdapter
     * @param {MessageHandler} messageHandler
     */
    constructor(spreadsheetAppAdapter, messageHandler) {
        this.spreadsheetAppAdapter = spreadsheetAppAdapter;
        this.messageHandler = messageHandler;
        this.wordSeparator = ', ';

        this.spreadsheetAppAdapter.setActiveSheet();
    }

    /**
     * @return {string}
     */
    getTodayBudget() {
        return this.spreadsheetAppAdapter.getCell('balance').getDisplayValue();
    }

    /**
     * @param {object} transaction
     * @return {void}
     */
    setTransaction(transaction) {
        const commentCell = this.spreadsheetAppAdapter.getCell('comments');
        const valueCell = this.spreadsheetAppAdapter.getCell('value');

        const currentValue = parseInt(valueCell.getDisplayValue()) || 0;
        const currentComment = commentCell.getDisplayValue() || '';

        let inputValue = transaction.value;
        let inputComment = transaction.comment;

        if (currentComment.length) {
            inputComment = this.wordSeparator + inputComment;
        }

        valueCell.setValue(currentValue + inputValue);
        commentCell.setValue(currentComment + inputComment);
    }

    /**
     * Undo last action
     * @return {void}
     */
    undo() {
        const commentCell = this.spreadsheetAppAdapter.getCell('comments');
        const valueCell = this.spreadsheetAppAdapter.getCell('value');

        const currentValue = parseInt(valueCell.getDisplayValue()) || 0;
        const currentComment = commentCell.getDisplayValue() || '';

        const undo = this.messageHandler.prepareUndo(currentValue, currentComment);

        commentCell.setValue(undo.comment);
        valueCell.setValue(undo.value);
    }

}