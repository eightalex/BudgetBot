import * as TelegramBot from 'node-telegram-bot-api';

export interface TelegramDataHandlerInterface {
    handle(contents: TelegramBot.Update): void
}
