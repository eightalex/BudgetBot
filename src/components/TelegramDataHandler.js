import {REGEX_COMMAND} from '../constants/Regex';

export default class TelegramDataHandler {

    /**
     * @param {TelegramAdapter} telegram
     * @param {Budget} budget
     * @param {MessageGenerator} messageGenerator
     * @param {MessageHandler} messageHandler
     */
    constructor(telegram, budget, messageGenerator, messageHandler) {
        this.telegram = telegram;
        this.budget = budget;
        this.messageGenerator = messageGenerator;
        this.messageHandler = messageHandler;
    }

    /**
     * @param {json} contents
     */
    handle(contents) {
        this.chatId = contents.message.chat.id;
        this.text = contents.message.text;

        if (contents.message.entities) {
            this.handleCommand();
        } else {
            this.handleMessage();
        }
    }

    /**
     * @return {void}
     */
    handleMessage() {
        const transaction = this.messageHandler.prepareTransaction(this.text, false);
        this.budget.setTransaction(transaction);
        this.telegram.message(this.chatId, this.messageGenerator.getMessage('expense'));
    }

    /**
     * @return {void}
     */
    handleCommand() {
        const command = REGEX_COMMAND.exec(this.text)[0]; // TODO add getCommand()

        switch (command) {
            case '/start':
                this.handleStart();
                break;
            case '/today':
                this.handleToday();
                break;
            case '/income':
                this.handleIncome();
                break;
            case '/undo':
                this.handleUndo();
                break;
            default:
                this.handleCommandException();
        }
    }

    /**
     * @return {void}
     */
    handleStart() {
        this.telegram.message(this.chatId, this.messageGenerator.getMessage('start', {chatId: this.chatId}));
    }

    /**
     * @return {void}
     */
    handleToday() {
        this.telegram.message(this.chatId, this.messageGenerator.getMessage('today'));
    }

    /**
     * @return {void}
     */
    handleIncome() {
        const transaction = this.messageHandler.prepareTransaction(this.text, true);
        this.budget.setTransaction(transaction);
        this.telegram.message(this.chatId, this.messageGenerator.getMessage('ok'));
    }

    /**
     * @return {void}
     */
    handleUndo() {
        this.budget.undo();
        this.telegram.message(this.chatId, this.messageGenerator.getMessage('undo'));
    }

    /**
     * @return {void}
     */
    handleCommandException() {
        this.telegram.message(this.chatId, this.messageGenerator.getMessage('commandException'));
        throw new Error('Something went wrong');
    }

}