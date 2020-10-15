import {TransactionType} from '../../types/TransactionType';

export interface MessageHandlerInterface {
    prepareComment(comment: string, value: number, options?: {isTelegramMessage?: boolean}): string
    prepareTransaction(inputMessage: string, isIncome: boolean): TransactionType
    prepareUndo(currentValue: number, currentComment: string): TransactionType
}
