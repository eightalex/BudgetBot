import {DateHandlerInterface} from '../utils/DateHandlerInterface';
import {SpreadsheetAppAdapterInterface} from './SpreadsheetAppAdapterInterface';
import {SearchError} from './Error';
import {PositionRow} from '../config/positionRow';
import {CellType} from '../types/Spreadsheet/CellType';

const NOT_FOUND = -1;

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

    private getRowPosition(startRow: number, column: number, searchString: string): number {
        const columnValues = this.sheet.getRange(
            startRow,
            column,
            Number(process.env.POSITION_ROW_END),
        ).getValues();

        const index = columnValues.findIndex(value => value.toString() === searchString);

        if (index === NOT_FOUND) {
            return NOT_FOUND;
        }

        return index + startRow;
    }

    private getCurrentDayRowPosition(): number {
        const position = this.getRowPosition(
            Number(process.env.POSITION_ROW_START),
            Number(process.env.POSITION_COLUMN_DATES),
            String(this.dateHandler.create()),
        );

        if (position === NOT_FOUND) {
            throw new SearchError('"CurrentDay" row position not found');
        }

        return position;
    }

    private getEndOfWeekRowPosition(): number {
        let weekEnd = this.dateHandler.getWeekEnd();
        let position = NOT_FOUND;
        let attempts = 6;

        while (position === NOT_FOUND && --attempts > 0) {
            position = this.getRowPosition(
                Number(process.env.POSITION_ROW_START),
                Number(process.env.POSITION_COLUMN_DATES),
                String(weekEnd),
            );
            weekEnd = this.dateHandler.addDays(weekEnd, -1);
        }

        if (position === NOT_FOUND && attempts === 0) {
            throw new SearchError('"EndOfWeek" row position not found');
        }

        return position;
    }
}
