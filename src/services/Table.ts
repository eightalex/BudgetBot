import {cells} from '~/config/cells';
import {currentDayMark} from '~/config/currentDayMark';
import {STRING} from '~/constants/string';
import {SpreadsheetAppAdapterInterface} from './SpreadsheetAppAdapterInterface';
import {TableInterface} from './TableInterface';

export class Table implements TableInterface {
    constructor(
        private readonly spreadsheetAppAdapter: SpreadsheetAppAdapterInterface,
    ) {}

    markCurrentDay(): void {
        const currentDate = this.spreadsheetAppAdapter.getCell(cells.mark);

        this.resetMarksColumn();

        currentDate
            .setValue(currentDayMark.value)
            .setFontColor(currentDayMark.color)
            .setFontWeight(currentDayMark.font.weight);
    }

    private resetMarksColumn(): void {
        const rowStart = Number(process.env.POSITION_ROW_START);
        const rowEnd = Number(process.env.POSITION_ROW_END);
        const column = Number(process.env.POSITION_COLUMN_MARK);

        let row: number;

        for (row = rowStart; row < rowEnd; row++) {
            const cell = this.spreadsheetAppAdapter.getCell({position: {row, column}});

            // @ts-ignore waiting for fix https://github.com/DefinitelyTyped/DefinitelyTyped/pull/51727
            cell.setHorizontalAlignment(DocumentApp.HorizontalAlignment.RIGHT);
            cell.setValue(STRING.EMPTY);
        }
    }
}
