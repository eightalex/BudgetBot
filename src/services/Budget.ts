import {TransactionType} from '../types/TransactionType';
import {BudgetInterface} from './BudgetInterface';
import {SpreadsheetAppAdapterInterface} from './SpreadsheetAppAdapterInterface';
import {MessageHandlerInterface} from './Message/MessageHandlerInterface';
import {cells} from '../config/cells';
import {DELIMITER} from "../constants/delimiter";

export class Budget implements BudgetInterface {
    constructor(
        private readonly spreadsheetAppAdapter: SpreadsheetAppAdapterInterface,
        private readonly messageHandler: MessageHandlerInterface,
    ) {}

    getTodayBudget(): string {
        return this.spreadsheetAppAdapter.getCell(cells.balance).getDisplayValue();
    }

    getBudgetForWeek(): string {
        return this.spreadsheetAppAdapter.getCell(cells.weekBudget).getDisplayValue();
    }

    getBudgetForMonth(): string {
        return this.spreadsheetAppAdapter.getCell(cells.monthBudget).getDisplayValue();
    }

    setTransaction(transaction: TransactionType): void {
        const commentCell = this.spreadsheetAppAdapter.getCell(cells.comments);
        const valueCell = this.spreadsheetAppAdapter.getCell(cells.value);

        const currentValue = parseInt(valueCell.getDisplayValue()) || 0;
        const currentComment = commentCell.getDisplayValue() || '';

        let inputValue = transaction.value;
        let inputComment = transaction.comment;

        if (currentComment.length) {
            inputComment = DELIMITER.COMMA + inputComment;
        }

        valueCell.setValue(currentValue + inputValue);
        commentCell.setValue(currentComment + inputComment);
    }

    /**
     * Undo last action
     */
    undo(): void {
        const commentCell = this.spreadsheetAppAdapter.getCell(cells.comments);
        const valueCell = this.spreadsheetAppAdapter.getCell(cells.value);

        const currentValue = parseInt(valueCell.getDisplayValue()) || 0;
        const currentComment = commentCell.getDisplayValue() || '';

        const undo = this.messageHandler.prepareUndo(currentValue, currentComment);

        commentCell.setValue(undo.comment);
        valueCell.setValue(undo.value);
    }
}
