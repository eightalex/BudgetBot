import {TelegramAdapter} from '../Telegram/TelegramAdapter';
import {TelegramAdapterInterface} from '../Telegram/TelegramAdapterInterface';

export class ExtendableError extends Error {
    private telegram: TelegramAdapterInterface;

    constructor(message) {
        super(message);

        this.message = message;
        this.name = this.constructor.name;
        this.telegram = new TelegramAdapter();

        this.telegram.message(process.env.CHAT_ID as string, `Error: ${message}`);
        Logger.log(message);
        Error.captureStackTrace(this, this.constructor);
    }
}
