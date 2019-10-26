export default class RequestHandler {

    /**
     * @param {MonoDataHandler} monoDataHandler
     * @param {TelegramDataHandler} telegramDataHandler
     * @param {ObjectHandler} objectHandler
     */
    constructor(monoDataHandler, telegramDataHandler, objectHandler) {
        this.monoDataHandler = monoDataHandler;
        this.telegramDataHandler = telegramDataHandler;
        this.objectHandler = objectHandler;

        this.fields = {
            mono: ['type', 'data'],
            telegram: ['update_id', 'message'],
        };
    }

    /**
     * @param {string} contents
     */
    handlePost(contents) {
        const parsedContents = JSON.parse(contents);

        switch (true) {
            case this.objectHandler.isEqualFields(parsedContents, this.fields.mono):
                this.monoDataHandler.handle(parsedContents);
                break;
            case this.objectHandler.isEqualFields(parsedContents, this.fields.telegram):
                this.telegramDataHandler.handle(parsedContents);
                break;
            default:
                throw new TypeError('Can\'t detect type of data');
        }
    }

}