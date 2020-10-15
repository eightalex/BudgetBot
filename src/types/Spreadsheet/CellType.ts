import {PositionRow} from '../../constants/PositionRow';

export type CellType = {
    position: {
        row: number | PositionRow.CurrentDay | PositionRow.EndOfWeek,
        column: number,
    },
};
