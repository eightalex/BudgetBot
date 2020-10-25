import {CellType} from '../types/Spreadsheet/CellType';
import {PositionRow} from './positionRow';

export const cells: {[key: string]: CellType} = {
    comments: {
        position: {
            row: PositionRow.CurrentDay,
            column: Number(process.env.POSITION_COLUMN_COMMENTS),
        },
    },
    value: {
        position: {
            row: PositionRow.CurrentDay,
            column: Number(process.env.POSITION_COLUMN_VALUE),
        },
    },
    balance: {
        position: {
            row: PositionRow.CurrentDay,
            column: Number(process.env.POSITION_COLUMN_BALANCE),
        },
    },
    weekBudget: {
        position: {
            row: PositionRow.EndOfWeek,
            column: Number(process.env.POSITION_COLUMN_BALANCE),
        },
    },
    monthBudget: {
        position: {
            row: Number(process.env.POSITION_ROW_END),
            column: Number(process.env.POSITION_COLUMN_BUDGET),
        },
    },
} as const;
