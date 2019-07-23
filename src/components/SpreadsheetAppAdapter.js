export default class SpreadsheetAppAdapter {

    constructor() {
        this.sheet = null;

        this.today = new Date();
        this.today.setHours(1);
        this.today.setMinutes(0);
        this.today.setSeconds(0);

        this.startRowPosition = 2; // first row is header
        this.datesColumnPosition = process.env.DATES_COLUMN_POSITION;
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
     * @return {object}
     */
    getSheet() {
        return this.sheet;
    }

    /**
     * @param startRow {number}
     * @param column {number}
     * @param searchString {string}
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

}