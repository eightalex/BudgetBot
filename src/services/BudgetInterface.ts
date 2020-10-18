import {TransactionType} from '../types/TransactionType';

export interface BudgetInterface {
    setTransaction(transaction: TransactionType): void
    undoLastTransaction(): void
}
