import * as TelegramBot from 'node-telegram-bot-api';
import {STRING} from '../../constants/string';
import {CommandDataType} from '../../types/Telegram/CommandDataType';
import {StringHandlerInterface} from '../../utils/StringHandlerInterface';
import {BudgetInterface} from '../BudgetInterface';
import {HandleError} from '../Error';
import {MessageGeneratorInterface} from '../Message/MessageGenerator/MessageGeneratorInterface';
import {MessageKeys} from '../Message/MessageGenerator/MessageKeys';
import {MessageHandlerInterface} from '../Message/MessageHandlerInterface';
import {AdapterInterface} from './AdapterInterface';
import {CommandFactoryInterface} from './CommandFactoryInterface';
import {DataHandlerInterface} from './DataHandlerInterface';

export class DataHandler implements DataHandlerInterface {
    private data: CommandDataType = {
        chatId: 0,
        text: STRING.EMPTY,
    };

    constructor(
        private readonly commandFactory: CommandFactoryInterface,
        private readonly telegram: AdapterInterface,
        private readonly budget: BudgetInterface,
        private readonly messageGenerator: MessageGeneratorInterface,
        private readonly messageHandler: MessageHandlerInterface,
        private readonly stringHandler: StringHandlerInterface,
    ) {}

    handle(contents: TelegramBot.Update): void {
        if (contents.message === undefined || contents.message.text === undefined) {
            throw new HandleError('Telegram message is empty');
        }

        this.data = {
            chatId: contents.message.chat.id,
            text: contents.message.text,
        };

        if (contents.message.entities) {
            this.handleCommand();
        } else {
            this.handleMessage();
        }
    }

    private handleMessage(): void {
        const transaction = this.messageHandler.prepareTransaction(this.data.text, false);
        this.budget.setTransaction(transaction);
        this.telegram.message(this.data.chatId, this.messageGenerator.getMessage(MessageKeys.Expense));
    }

    private handleCommand(): void {
        const command = this.stringHandler.getCommand(this.data.text);
        this.commandFactory.create(command).handle({
            telegram: this.telegram,
            budget: this.budget,
            messageGenerator: this.messageGenerator,
            messageHandler: this.messageHandler,
        }, this.data);
    }
}
