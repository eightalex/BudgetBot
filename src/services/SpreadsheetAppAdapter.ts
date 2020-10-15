import {SpreadsheetAppAdapterInterface} from './SpreadsheetAppAdapterInterface';
import {SearchError} from './Error';
import {PositionRow} from '../constants/PositionRow';
import {CellType} from '../types/Spreadsheet/CellType';

export class SpreadsheetAppAdapter implements SpreadsheetAppAdapterInterface {
    private sheet: GoogleAppsScript.Spreadsheet.Sheet;
    private dateHandler: any;

    private gettersMap = {
        [PositionRow.CurrentDay]: this.getCurrentDayRowPosition.bind(this),
        [PositionRow.EndOfWeek]: this.getEndOfWeekRowPosition.bind(this),
    };

    constructor(dateHandler) {
        this.sheet = SpreadsheetApp.getActiveSheet();
        this.dateHandler = dateHandler;
    }

    getCell(cell: CellType): GoogleAppsScript.Spreadsheet.Range {
        const row = typeof cell.position.row === 'number'
            ? cell.position.row
            : this.gettersMap[cell.position.row]();

        return this.sheet.getRange(
            row,
            cell.position.column
        );
    }

    private getRowPosition(startRow: number, column: number, searchString: string | Date): number {
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

        throw new SearchError('Row position does not funded');
    }

    private getCurrentDayRowPosition(): number {
        const today = this.dateHandler.create();

        return this.getRowPosition(
            Number(process.env.POSITION_ROW_START),
            Number(process.env.POSITION_COLUMN_DATES),
            today,
        );
    }

    private getEndOfWeekRowPosition(): number {
        const weekEnd = this.dateHandler.getWeekEnd();

        return this.getRowPosition(
            Number(process.env.POSITION_ROW_START),
            Number(process.env.POSITION_COLUMN_DATES),
            weekEnd,
        );
    }
}
