import {CellType} from '~/types/Spreadsheet/CellType';

export interface SpreadsheetAppAdapterInterface {
    getCell(cell: CellType): GoogleAppsScript.Spreadsheet.Range
}
