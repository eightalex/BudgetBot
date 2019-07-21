export default class MessageGenerator {

    constructor() {
        this.okMessages = [
            'Угу', 'Исполнено', 'Добавил', 'Оке', 'Done', 'Как скажешь', 'Ну ок', 'Ага', 'Хорошо', 'Ок'
        ];
    }

    getMessage(type) {
        switch (type) {
            case "ok":
                return this.getOkMessage();
            default:
                throw new TypeError("Unresolved message type");
        }
    }

    getOkMessage() {
        const index = (Math.random() * 10) | 0;
        return this.okMessages[index];
    }

}