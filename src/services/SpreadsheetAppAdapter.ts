import {DateHandlerInterface} from '../utils/DateHandlerInterface';
import {SpreadsheetAppAdapterInterface} from './SpreadsheetAppAdapterInterface';
import {SearchError} from './Error';
import {PositionRow} from '../constants/PositionRow';
import {CellType} from '../types/Spreadsheet/CellType';

export class SpreadsheetAppAdapter implements SpreadsheetAppAdapterInterface {
    private sheet: GoogleAppsScript.Spreadsheet.Sheet;
    private dateHandler: DateHandlerInterface;

    private gettersMap = {
        [PositionRow.CurrentDay]: this.getCurrentDayRowPosition.bind(this),
        [PositionRow.EndOfWeek]: this.getEndOfWeekRowPosition.bind(this),
    };

    constructor(dateHandler: DateHandlerInterface) {
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

        const index = columnValues.findIndex(value => value.toString() === searchString.toString());

        if (index === -1) {
            throw new SearchError('Row position not found');
        }

        return index + startRow;
    }

    private getCurrentDayRowPosition(): number {
        return this.getRowPosition(
            Number(process.env.POSITION_ROW_START),
            Number(process.env.POSITION_COLUMN_DATES),
            this.dateHandler.create(),
        );
    }

    private getEndOfWeekRowPosition(): number {
        return this.getRowPosition(
            Number(process.env.POSITION_ROW_START),
            Number(process.env.POSITION_COLUMN_DATES),
            this.dateHandler.getWeekEnd(),
        );
    }
}
