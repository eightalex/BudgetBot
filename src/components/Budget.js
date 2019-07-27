export default class Budget {

    constructor(spreadsheetAppAdapter, messageHandler) {
        this.spreadsheetAppAdapter = spreadsheetAppAdapter;
        this.messageHandler = messageHandler;

        this.spreadsheetAppAdapter.setActiveSheet();

        this.wordsSeparator = ', ';
    }

    /**
     * @return {string}
     */
    getTodayBudget() {
        return this.spreadsheetAppAdapter.getCell('balance').getDisplayValue();
    }

    /**
     * @param text - input message
     * @return {void}
     */
    setExpense(text) {
        const commentCell = this.spreadsheetAppAdapter.getCell('comments');
        const valueCell = this.spreadsheetAppAdapter.getCell('value');
        const expense = this.messageHandler.prepareExpense(text);

        const currentValue = parseInt(valueCell.getDisplayValue()) || 0;
        const currentComment = commentCell.getDisplayValue() || '';

        let newValue = expense.value;
        let newComment = expense.comment;

        if (currentComment.length) {
            newComment = this.wordsSeparator + newComment;
        }

        commentCell.setValue(currentComment + newComment);
        valueCell.setValue(currentValue + newValue);
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