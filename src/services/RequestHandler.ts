import {ObjectHandlerInterface} from '~/utils/ObjectHandlerInterface';
import {MonoDataHandlerInterface} from './Mono/MonoDataHandlerInterface';
import {RequestHandlerInterface} from './RequestHandlerInterface';
import {HandleError} from './Error';
import * as Telegram from './Telegram';

export class RequestHandler implements RequestHandlerInterface {
    private fields: {mono: string[], telegram: string[]} = {
        mono: ['type', 'data'],
        telegram: ['update_id', 'message'],
    };

    constructor(
        private readonly monoDataHandler: MonoDataHandlerInterface,
        private readonly telegramDataHandler: Telegram.DataHandlerInterface,
        private readonly objectHandler: ObjectHandlerInterface,
    ) {}

    handlePost(contents: string): void {
        const parsedContents = JSON.parse(contents);

        switch (true) {
            case this.objectHandler.isEqualFields(parsedContents, this.fields.mono):
                this.monoDataHandler.handle(parsedContents);
                break;
            case this.objectHandler.isEqualFields(parsedContents, this.fields.telegram):
                this.telegramDataHandler.handle(parsedContents);
                break;
            default:
                throw new HandleError(`Can't detect type of data`);
        }
    }
}
