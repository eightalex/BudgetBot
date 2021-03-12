import {PositionRow} from './positionRow';

export const cells = {
    mark: {
        position: {
            row: PositionRow.CurrentDay,
            column: Number(process.env.POSITION_COLUMN_MARK),
        },
    },
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
    lastTransaction: {
        position: {
            row: Number(process.env.POSITION_ROW_START),
            column: Number(process.env.POSITION_COLUMN_LAST_TRANSACTION),
        }
    },
} as const;
