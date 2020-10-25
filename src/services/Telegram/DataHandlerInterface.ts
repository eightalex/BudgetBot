import * as TelegramBot from 'node-telegram-bot-api';

export interface DataHandlerInterface {
    handle(contents: TelegramBot.Update): void
}
