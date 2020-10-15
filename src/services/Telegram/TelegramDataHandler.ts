import * as TelegramBot from 'node-telegram-bot-api';
import {StringHandlerInterface} from '../../utils/StringHandlerInterface';
import {BudgetInterface} from '../BudgetInterface';
import {HandleError} from '../Error';
import {MessageGeneratorInterface} from '../Message/MessageGeneratorInterface';
import {MessageHandlerInterface} from '../Message/MessageHandlerInterface';
import {TelegramAdapterInterface} from './TelegramAdapterInterface';
import {TelegramDataHandlerInterface} from './TelegramDataHandlerInterface';

export class TelegramDataHandler implements TelegramDataHandlerInterface {
    private chatId: number = 0;
    private text: string = '';

    constructor(
        private readonly telegram: TelegramAdapterInterface,
        private readonly budget: BudgetInterface,
        private readonly messageGenerator: MessageGeneratorInterface,
        private readonly messageHandler: MessageHandlerInterface,
        private readonly stringHandler: StringHandlerInterface,
    ) {}

    handle(contents: TelegramBot.Update): void {
        if (contents.message === undefined || contents.message.text === undefined) {
            throw new HandleError('Telegram message is empty');
        }

        this.chatId = contents.message.chat.id;
        this.text = contents.message.text;

        if (contents.message.entities) {
            this.handleCommand();
        } else {
            this.handleMessage();
        }
    }

    private handleMessage(): void {
        const transaction = this.messageHandler.prepareTransaction(this.text, false);
        this.budget.setTransaction(transaction);
        this.telegram.message(this.chatId, this.messageGenerator.getMessage('expense'));
    }

    private handleCommand(): void {
        const command = this.stringHandler.getCommand(this.text);

        switch (command) {
            case '/start':
                this.handleStart();
                break;
            case '/today':
                this.handleToday();
                break;
            case '/income':
                this.handleIncome();
                break;
            case '/undo':
                this.handleUndo();
                break;
            default:
                throw new HandleError('Something went wrong');
        }
    }

    private handleStart(): void {
        this.telegram.message(this.chatId, this.messageGenerator.getMessage('start', {chatId: this.chatId.toString()}));
    }

    private handleToday(): void {
        this.telegram.message(this.chatId, this.messageGenerator.getMessage('today'));
    }

    private handleIncome(): void {
        const transaction = this.messageHandler.prepareTransaction(this.text, true);
        this.budget.setTransaction(transaction);
        this.telegram.message(this.chatId, this.messageGenerator.getMessage('ok'));
    }

    private handleUndo(): void {
        this.budget.undo();
        this.telegram.message(this.chatId, this.messageGenerator.getMessage('undo'));
    }
}
