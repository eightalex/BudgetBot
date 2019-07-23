export default class MessageGenerator {

    constructor() {
        this.okMessages = [
            'Угу', 'Исполнено', 'Добавил', 'Оке', 'Done', 'Как скажешь', 'Ну ок', 'Ага', 'Хорошо', 'Ок'
        ];

        this.undoMessages = [
            'Готово', 'Сделал', 'Отменил', 'Окей', 'Done', 'Как скажешь', 'Ну ок', 'Ага', 'Хорошо', 'Ок'
        ];
    }

    /**
     * @param type {string}
     * @return {string}
     */
    getMessage(type) {
        switch (type) {
            case 'ok':
                return this.getOkMessage();
            case 'undo':
                return this.getUndoMessage();
            default:
                throw new TypeError("Unresolved message type");
        }
    }

    /**
     * @param length {number}
     * @return {number}
     */
    getRandomIndex(length) {
        return Math.random() * (length - 1) | 0;
    }

    /**
     * @return {string}
     */
    getOkMessage() {
        return this.okMessages[
            this.getRandomIndex(this.okMessages.length)
        ];
    }

    /**
     * @return {string}
     */
    getUndoMessage() {
        return this.undoMessages[
            this.getRandomIndex(this.undoMessages.length)
        ];
    }

}