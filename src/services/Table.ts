import {cells} from '~/config/cells';
import {STRING} from '~/constants/string';
import {SpreadsheetAppAdapterInterface} from './SpreadsheetAppAdapterInterface';
import {TableInterface} from './TableInterface';

const MARK = '>';

export class Table implements TableInterface {
    constructor(
        private readonly spreadsheetAppAdapter: SpreadsheetAppAdapterInterface,
    ) {}

    markCurrentDay(): void {
        const currentDate = this.spreadsheetAppAdapter.getCell(cells.mark);
        this.clearAllMarks();
        currentDate.setValue(MARK);
    }

    private clearAllMarks(): void {
        const rowStart = Number(process.env.POSITION_ROW_START)
        const rowEnd = Number(process.env.POSITION_ROW_END);

        for (let i = rowStart; i < rowEnd; i++) {
            const cell = this.spreadsheetAppAdapter.getCell({
                position: {
                    row: i,
                    column: Number(process.env.POSITION_COLUMN_MARK)
                }
            });
            cell.setValue(STRING.EMPTY);
        }
    }
}
