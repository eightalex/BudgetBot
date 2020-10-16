import {MessageHelpersType} from '../../../types/MessageHelpersType';

export class AbstractMessage {
    protected readonly currency = process.env.CURRENCY_ACRONYM as string;

    constructor(
        protected messageHelpers: MessageHelpersType,
    ) {}

    protected getRandomMessage(messages: string[]): string {
        return messages[
            this.messageHelpers.numberHandler.getRandomAbsoluteInteger(messages.length)
        ];
    }

    protected compose(strings: string[]): string {
        return this.messageHelpers.stringHandler.compose(strings);
    }
}
