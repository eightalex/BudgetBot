import {DELIMITER_WORD, DELIMITER_SENTENCE, DELIMITER_LINE} from '../../constants/Delimiter';
import messages from '../../data/Messages';

export default class MessageGenerator {

    /**
     * @type {string}
     */
    #currency = process.env.CURRENCY_ACRONYM;

    /**
     * @param {Budget} budget
     */
    constructor(budget) {
        this.budget = budget;
    }

    /**
     * @param {string} type
     * @param {object} options
     * @return {string}
     */
    getMessage(type, options = {}) {
        switch (type) {
            case 'start':
                return this.#getStartMessage(options);
            case 'notify':
                return this.#getNotifyMessage();
            case 'ok':
                return this.#getOkMessage();
            case 'undo':
                return this.#getUndoMessage();
            case 'today':
                return this.#getTodayMessage();
            case 'expense':
                return this.#getExpenseMessage();
            case 'commandException':
                return this.#getCommandException();
            default:
                throw new TypeError('Unresolved message type');
        }
    }

    /**
     * @param {number} length
     * @return {number}
     */
    #getRandomIndex(length) {
        return Math.random() * (length - 1) | 0;
    }

    /**
     * @param {array<string>} messages
     * @return {string}
     */
    #getRandomMessage(messages) {
        return messages[
            this.#getRandomIndex(messages.length)
        ];
    }

    /**
     * @return {string}
     */
    #getChadIdMessage() {
        return this.#getRandomMessage(messages.chadId);
    }

    /**
     * @param {{chatId: string}} options
     * @return {string}
     */
    #getStartMessage(options) {
        const chatId = options.hasOwnProperty('chatId') ? options.chatId : '0';

        return this.#getRandomMessage(messages.start)
            + DELIMITER_SENTENCE
            + this.#getChadIdMessage()
            + DELIMITER_WORD
            + chatId;
    }

    /**
     * @return {string}
     */
    #getNotifyMessage() {
        return this.#getRandomMessage(messages.morning)
            + DELIMITER_LINE
            + DELIMITER_LINE
            + this.#getRandomMessage(messages.week)
            + DELIMITER_WORD
            + this.budget.getBudgetForWeek()
            + DELIMITER_WORD
            + this.#currency
            + DELIMITER_SENTENCE
            + DELIMITER_LINE
            + this.#getRandomMessage(messages.month)
            + DELIMITER_WORD
            + this.budget.getBudgetForMonth()
            + DELIMITER_WORD
            + this.#currency;
    }

    /**
     * @return {string}
     */
    #getOkMessage() {
        return this.#getRandomMessage(messages.ok);
    }

    /**
     * @return {string}
     */
    #getUndoMessage() {
        return this.#getRandomMessage(messages.undo)
            + DELIMITER_SENTENCE
            + this.#getTodayMessage();
    }

    /**
     * @return {string}
     */
    #getTodayMessage() {
        return this.#getRandomMessage(messages.today)
            + DELIMITER_WORD
            + this.budget.getTodayBudget()
            + DELIMITER_WORD
            + this.#currency;
    }

    /**
     * @return {string}
     */
    #getExpenseMessage() {
        return this.#getOkMessage()
            + DELIMITER_SENTENCE
            + this.#getTodayMessage();
    }

    /**
     * @return {string}
     */
    #getCommandException() {
        return this.#getRandomMessage(messages.commandException);
    }

}