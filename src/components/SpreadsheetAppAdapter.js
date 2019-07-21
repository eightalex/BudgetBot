export default class SpreadsheetAppAdapter {

    constructor() {
        this.sheet = null;
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

}