import {TransactionType} from '../types/TransactionType';

export interface BudgetInterface {
    getTodayBudget(): string
    getBudgetForWeek(): string
    getBudgetForMonth(): string
    setTransaction(transaction: TransactionType): void
    undoLastTransaction(): void
}
