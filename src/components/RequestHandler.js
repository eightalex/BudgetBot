export default class RequestHandler {

    constructor(monoDataHandler, telegramDataHandler) {
        this.monoDataHandler = monoDataHandler;
        this.telegramDataHandler = telegramDataHandler;

        this.fields = {
            mono: ['type', 'data'],
            telegram: ['update_id', 'message'],
        };
    }

    handlePost(contents) {
        contents = JSON.parse(contents);

        switch (true) {
            case this.isEqualFields(this.fields.mono, contents):
                this.monoDataHandler.handle(contents);
                break;
            case this.isEqualFields(this.fields.telegram, contents):
                this.telegramDataHandler.handle(contents);
                break;
            default:
                throw new TypeError('Can\'t detect type of data');
        }
    }

    isEqualFields(comparedFields, data) {
        const dataFields = Object.keys(data);
        return comparedFields.every((field, index) => dataFields[index] === field);
    }

}