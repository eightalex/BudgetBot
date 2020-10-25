import * as Telegram from '../Telegram';

export class ExtendableError extends Error {
    private telegram: Telegram.AdapterInterface;

    constructor(message) {
        super(message);

        this.message = message;
        this.name = this.constructor.name;
        this.telegram = new Telegram.Adapter();

        this.telegram.message(process.env.CHAT_ID as string, `Error: ${message}`);
        Logger.log(message);
        Error.captureStackTrace(this, this.constructor);
    }
}
