export default class Budget {

    constructor(spreadsheetAppAdapter, messageHandler) {
        this.spreadsheetAppAdapter = spreadsheetAppAdapter;
        this.messageHandler = messageHandler;

        this.spreadsheetAppAdapter.setActiveSheet();
        this.sheet = this.spreadsheetAppAdapter.getSheet();

        this.commentsColumnPosition = process.env.COMMENTS_COLUMN_POSITION;
        this.valueColumnPosition = process.env.VALUE_COLUMN_POSITION;
        this.balanceColumnPosition = process.env.BALANCE_COLUMN_POSITION;
    }

    /**
     * @return {string}
     */
    getTodayBudget() {
        return this.sheet.getRange(
            this.spreadsheetAppAdapter.getCurrentRowPosition(),
            this.balanceColumnPosition
        ).getDisplayValue();
    }

    /**
     * @param text - input message
     * @return {void}
     */
    setExpense(text) {
        const commentCell = this.sheet.getRange(
            this.spreadsheetAppAdapter.getCurrentRowPosition(),
            this.commentsColumnPosition
        );

        const valueCell = this.sheet.getRange(
            this.spreadsheetAppAdapter.getCurrentRowPosition(),
            this.valueColumnPosition
        );

        const currentValue = parseInt(valueCell.getDisplayValue()) || 0;
        const currentComment = commentCell.getDisplayValue() || '';

        const expense = this.messageHandler.prepareExpense(text);

        let newValue = expense.value;
        let newComment = expense.comment;

        if (currentComment.length) {
            newComment = ', ' + newComment;
        }

        commentCell.setValue(currentComment + newComment);
        valueCell.setValue(currentValue + newValue);
    }

    /**
     * Undo last action
     * @return {void}
     */
    undo() {
        const commentCell = this.sheet.getRange(
            this.spreadsheetAppAdapter.getCurrentRowPosition(),
            this.commentsColumnPosition
        );

        const valueCell = this.sheet.getRange(
            this.spreadsheetAppAdapter.getCurrentRowPosition(),
            this.valueColumnPosition
        );

        const currentValue = parseInt(valueCell.getDisplayValue()) || 0;
        const currentComment = commentCell.getDisplayValue() || '';

        const undo = this.messageHandler.prepareUndo(currentValue, currentComment);

        commentCell.setValue(undo.comment);
        valueCell.setValue(undo.value);
    }

}