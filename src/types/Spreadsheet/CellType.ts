import {PositionRow} from '../../config/positionRow';

export type CellType = {
    position: {
        row: number | PositionRow.CurrentDay | PositionRow.EndOfWeek,
        column: number,
    },
};
