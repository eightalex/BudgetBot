export default class SpreadsheetAppAdapter {

    /**
     * @param {DateHandler} dateHandler
     */
    constructor(dateHandler) {
        this.sheet = this.getActiveSheet();
        this.today = dateHandler.create();
    }

    /**
     * @return {object}
     */
    getActiveSheet() {
        return SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
    }

    /**
     * @param {string} startRow
     * @param {string} column
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
                return Number(startRow) + i;
            }
        }

        return false; // TODO add Error
    }

    /**
     * @return {number}
     */
    getCurrentRowPosition() {
        return this.getRowPosition(
            process.env.POSITION_ROW_START,
            process.env.POSITION_COLUMN_DATES,
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
            process.env.POSITION_COLUMN_COMMENTS
        );
    }

    /**
     * @return {object}
     */
    getValueCell() {
        return this.sheet.getRange(
            this.getCurrentRowPosition(),
            process.env.POSITION_COLUMN_VALUE
        );
    }

    /**
     * @return {object}
     */
    getBalanceCell() {
        return this.sheet.getRange(
            this.getCurrentRowPosition(),
            process.env.POSITION_COLUMN_BALANCE
        )
    }

}