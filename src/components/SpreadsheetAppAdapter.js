export default class SpreadsheetAppAdapter {

    constructor() {
        this.sheet = null;

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
     * @return {void}
     */
    setActiveSheet() {
        this.sheet = this.getActiveSheet();
    }

    /**
     * @return {object}
     */
    getActiveSheet() {
        return SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
    }

    /**
     * @param {number} startRow
     * @param {number} column
     * @param {string} searchString
     * @return {number|boolean}
     */
    getRowPosition(startRow, column, searchString) {
        const columnValues = this.sheet.getRange(
            startRow,
            column,
            this.sheet.getLastRow()
        ).getValues();

        for (let i = 0; i < columnValues.length; i++) {
            if (columnValues[i].toString() === searchString.toString()) {
                return startRow + i;
            }
        }

        return false;
    }

    /**
     * @return {number}
     */
    getCurrentRowPosition() {
        return this.getRowPosition(
            this.startRowPosition,
            this.datesColumnPosition,
            this.today
        );
    }

    /**
     * @param {string} name
     * @return {object|TypeError}
     */
    getCell(name) {
        switch (name) {
            case 'comments':
                return this.getCommentsCell();
            case 'value':
                return this.getValueCell();
            case 'balance':
                return this.getBalanceCell();
            default:
                throw new TypeError('Unresolved cell type');
        }
    }

    /**
     * @return {object}
     */
    getCommentsCell() {
        return this.sheet.getRange(
            this.getCurrentRowPosition(),
            this.commentsColumnPosition
        );
    }

    /**
     * @return {object}
     */
    getValueCell() {
        return this.sheet.getRange(
            this.getCurrentRowPosition(),
            this.valueColumnPosition
        );
    }

    /**
     * @return {object}
     */
    getBalanceCell() {
        return this.sheet.getRange(
            this.getCurrentRowPosition(),
            this.balanceColumnPosition
        )
    }

}