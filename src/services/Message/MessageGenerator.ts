import {BudgetInterface} from '../BudgetInterface';
import {MessageGeneratorInterface} from './MessageGeneratorInterface';
import {DELIMITER_WORD, DELIMITER_SENTENCE, DELIMITER_LINE} from '../../constants/delimiter';
import {messages} from '../../data/messages';
import {HandleError} from '../Error';

export class MessageGenerator implements MessageGeneratorInterface {
    private readonly currency = process.env.CURRENCY_ACRONYM;

    constructor(private readonly budget: BudgetInterface) {}

    getMessage(type: string, options: {chatId?: string} = {}): string {
        switch (type) {
            case 'start':
                return this.getStartMessage(options);
            case 'notify':
                return this.getNotifyMessage();
            case 'ok':
                return this.getOkMessage();
            case 'undo':
                return this.getUndoMessage();
            case 'today':
                return this.getTodayMessage();
            case 'expense':
                return this.getExpenseMessage();
            default:
                throw new HandleError('Unresolved message type');
        }
    }

    private getRandomIndex(length: number): number {
        return Math.random() * (length - 1) | 0;
    }

    private getRandomMessage(messages: string[]): string {
        return messages[
            this.getRandomIndex(messages.length)
        ];
    }

    private getChadIdMessage(): string {
        return this.getRandomMessage(messages.chadId);
    }

    private getStartMessage(options: {chatId?: string}): string {
        const chatId = options.hasOwnProperty('chatId') ? options.chatId : '0';

        return this.getRandomMessage(messages.start)
            + DELIMITER_SENTENCE
            + this.getChadIdMessage()
            + DELIMITER_WORD
            + chatId;
    }

    private getNotifyMessage(): string {
        return this.getRandomMessage(messages.morning)
            + DELIMITER_LINE
            + DELIMITER_LINE
            + this.getRandomMessage(messages.week)
            + DELIMITER_WORD
            + this.budget.getBudgetForWeek()
            + DELIMITER_WORD
            + this.currency
            + DELIMITER_SENTENCE
            + DELIMITER_LINE
            + this.getRandomMessage(messages.month)
            + DELIMITER_WORD
            + this.budget.getBudgetForMonth()
            + DELIMITER_WORD
            + this.currency;
    }

    private getOkMessage(): string {
        return this.getRandomMessage(messages.ok);
    }

    private getUndoMessage(): string {
        return this.getRandomMessage(messages.undo)
            + DELIMITER_SENTENCE
            + this.getTodayMessage();
    }

    private getTodayMessage(): string {
        return this.getRandomMessage(messages.today)
            + DELIMITER_WORD
            + this.budget.getTodayBudget()
            + DELIMITER_WORD
            + this.currency;
    }

    private getExpenseMessage(): string {
        return this.getOkMessage()
            + DELIMITER_SENTENCE
            + this.getTodayMessage();
    }
}
