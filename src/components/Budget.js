export default class Budget {

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
     * @param inputMessage {string}
     * @param options {object}
     * @return {void}
     */
    setTransaction(inputMessage, options) {
        const commentCell = this.spreadsheetAppAdapter.getCell('comments');
        const valueCell = this.spreadsheetAppAdapter.getCell('value');
        const isIncome = options.operation === process.env.OPERATION_INCOME;
        const transaction = this.messageHandler.prepareTransaction(inputMessage, isIncome);

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