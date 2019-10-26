export default class MessageGenerator {

    /**
     * @param {Budget} budget
     */
    constructor(budget) {
        this.budget = budget;

        this.currency = process.env.CURRENCY_ACRONYM;
        this.wordSeparator = ' ';
        this.sentenceSeparator = '. ';

        this.startMessages = [
            'Ну привет'
        ];

        this.chadIdMessages = [
            'Ваш chat id:'
        ];

        this.todayBudgetMessages = [
            'Бюджет на сегодня:'
        ];

        this.okMessages = [
            'Угу', 'Исполнено', 'Добавил', 'Оке', 'Done', 'Как скажешь', 'Ну ок', 'Ага', 'Хорошо', 'Ок'
        ];

        this.undoMessages = [
            'Готово', 'Сделал', 'Отменил', 'Окей', 'Done', 'Как скажешь', 'Ну ок', 'Ага', 'Хорошо', 'Ок'
        ];

        this.todayMessages = [
            'На сегодня осталось', 'Осталось', 'На сегодня ещё есть'
        ];

        this.commandExceptionMessages = [
            'Всё не то. Давай по новой'
        ];
    }

    /**
     * @param {string} type
     * @param {object} options
     * @return {string}
     */
    getMessage(type, options = {}) {
        switch (type) {
            case 'start':
                return this.getStartMessage(options);
            case 'todayBudget':
                return this.getTodayBudgetMessage();
            case 'ok':
                return this.getOkMessage();
            case 'undo':
                return this.getUndoMessage();
            case 'today':
                return this.getTodayMessage();
            case 'expense':
                return this.getExpenseMessage();
            case 'commandException':
                return this.getCommandException();
            default:
                throw new TypeError('Unresolved message type');
        }
    }

    /**
     * @param {number} length
     * @return {number}
     */
    getRandomIndex(length) {
        return Math.random() * (length - 1) | 0;
    }

    /**
     * @param {array} messages
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
    getChadIdMessage() {
        return this.getRandomMessage(this.chadIdMessages);
    }

    /**
     * @param {object} options
     * @return {string}
     */
    getStartMessage(options) {
        const chatId = options.hasOwnProperty('chatId') ? options.chatId : '0';

        return this.getRandomMessage(this.startMessages)
            + this.sentenceSeparator
            + this.getChadIdMessage()
            + this.wordSeparator
            + chatId;
    }

    /**
     * @return {string}
     */
    getTodayBudgetMessage() {
        return this.getRandomMessage(this.todayBudgetMessages)
            + this.wordSeparator
            + this.budget.getTodayBudget()
            + this.wordSeparator
            + this.currency;
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
        return this.getRandomMessage(this.undoMessages)
            + this.sentenceSeparator
            + this.getTodayMessage();
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

    /**
     * @return {string}
     */
    getExpenseMessage() {
        return this.getOkMessage()
            + this.sentenceSeparator
            + this.getTodayMessage();
    }

    /**
     * @return {string}
     */
    getCommandException() {
        return this.getRandomMessage(this.commandExceptionMessages);
    }

}