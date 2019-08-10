export default class MessageGenerator {

    constructor(budget) {
        this.budget = budget;

        this.currency = process.env.CURRENCY_ACRONYM;
        this.wordSeparator = ' ';

        this.okMessages = [
            'Угу', 'Исполнено', 'Добавил', 'Оке', 'Done', 'Как скажешь', 'Ну ок', 'Ага', 'Хорошо', 'Ок'
        ];

        this.undoMessages = [
            'Готово', 'Сделал', 'Отменил', 'Окей', 'Done', 'Как скажешь', 'Ну ок', 'Ага', 'Хорошо', 'Ок'
        ];

        this.todayMessages = [
            'На сегодня осталось', 'Осталось', 'Ещё есть', 'В наличии', 'Есть', 'На сегодня есть'
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
            case 'today':
                return this.getTodayMessage();
            default:
                throw new TypeError('Unresolved message type');
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
     * @param messages {array}
     * @return {string}
     */
    getRandomMessage(messages) {
        return messages[
            this.getRandomIndex(messages.length)
        ];
    }

    /**
     * @return {string}
     */
    getOkMessage() {
        return this.getRandomMessage(this.okMessages);
    }

    /**
     * @return {string}
     */
    getUndoMessage() {
        return this.getRandomMessage(this.undoMessages);
    }

    /**
     * @return {string}
     */
    getTodayMessage() {
        return this.getRandomMessage(this.todayMessages)
            + this.wordSeparator
            + this.budget.getTodayBudget()
            + this.wordSeparator
            + this.currency;
    }

}