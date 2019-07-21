export default class Budget {

    constructor(spreadsheetAppAdapter, messageHandler) {
        this.spreadsheetAppAdapter = spreadsheetAppAdapter;
        this.spreadsheetAppAdapter.setActiveSheet();
        this.sheet = this.spreadsheetAppAdapter.getSheet();

        this.messageHandler = messageHandler;

        this.today = new Date();
        this.today.setHours(1);
        this.today.setMinutes(0);
        this.today.setSeconds(0);

        this.startRowPosition = 2; // first row is header
        this.datesColumnPosition = process.env.DATES_COLUMN_POSITION;
        this.commentsColumnPosition = process.env.COMMENTS_COLUMN_POSITION;
        this.valueColumnPosition = process.env.VALUE_COLUMN_POSITION;
        this.balanceColumnPosition = process.env.BALANCE_COLUMN_POSITION;
    }

    /**
     * @return {number}
     */
    getCurrentRowPosition() {
        return this.spreadsheetAppAdapter.getRowPosition(
            this.startRowPosition,
            this.datesColumnPosition,
            this.today
        );
    }

    /**
     * @return {string}
     */
    getTodayBudget() {
        return this.sheet.getRange(
            this.getCurrentRowPosition(),
            this.balanceColumnPosition
        ).getDisplayValue();
    }

    /**
     * @param text - input message
     * @return {void}
     */
    setExpense(text) {
        const expense = this.messageHandler.prepareExpense(text);

        const commentCell = this.sheet.getRange(
            this.getCurrentRowPosition(),
            this.commentsColumnPosition
        );

        const valueCell = this.sheet.getRange(
            this.getCurrentRowPosition(),
            this.valueColumnPosition
        );

        const currentValue = parseInt(valueCell.getDisplayValue()) || 0;
        const currentComment = commentCell.getDisplayValue() || '';

        let newValue = parseInt(expense.value, 10);
        let newComment = expense.comment;

        if (currentComment.length) {
            newComment = ', ' + newComment;
        }

        commentCell.setValue(currentComment + newComment);
        valueCell.setValue(currentValue + newValue);
    }

}