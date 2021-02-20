import {STRING} from '~/constants/string';
import {TransactionType} from '~/types/TransactionType';
import {BudgetInterface} from './BudgetInterface';
import {HandleError} from './Error';
import {SpreadsheetAppAdapterInterface} from './SpreadsheetAppAdapterInterface';
import {MessageHandlerInterface} from './Message/MessageHandlerInterface';
import {cells} from '~/config/cells';
import {DELIMITER} from '~/constants/delimiter';

export class Budget implements BudgetInterface {
    constructor(
        private readonly spreadsheetAppAdapter: SpreadsheetAppAdapterInterface,
        private readonly messageHandler: MessageHandlerInterface,
    ) {}

    setTransaction(transaction: TransactionType): void {
        const lastTransactionCell = this.spreadsheetAppAdapter.getCell(cells.lastTransaction);
        const commentCell = this.spreadsheetAppAdapter.getCell(cells.comments);
        const valueCell = this.spreadsheetAppAdapter.getCell(cells.value);

        const lastTransactionId = lastTransactionCell.getDisplayValue() || STRING.EMPTY;
        const currentComment = commentCell.getDisplayValue() || STRING.EMPTY;
        const currentValue = parseInt(valueCell.getDisplayValue()) || 0;

        let inputValue = transaction.value;
        let inputComment = transaction.comment;

        if (lastTransactionId === transaction.id) {
            throw new HandleError('Duplicate transaction');
        }

        if (currentComment !== STRING.EMPTY) {
            inputComment = DELIMITER.COMMA + inputComment;
        }

        lastTransactionCell.setValue(transaction.id);
        commentCell.setValue(currentComment + inputComment);
        valueCell.setValue(currentValue + inputValue);
    }

    undoLastTransaction(): void {
        const commentCell = this.spreadsheetAppAdapter.getCell(cells.comments);
        const valueCell = this.spreadsheetAppAdapter.getCell(cells.value);

        const currentValue = parseInt(valueCell.getDisplayValue()) || 0;
        const currentComment = commentCell.getDisplayValue() || STRING.EMPTY;

        const undo = this.messageHandler.prepareUndo(currentValue, currentComment);

        commentCell.setValue(undo.comment);
        valueCell.setValue(undo.value);
    }
}
