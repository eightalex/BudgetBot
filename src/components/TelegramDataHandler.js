export default class TelegramDataHandler {

    constructor(telegram, budget, messageGenerator, messageHandler) {
        this.telegram = telegram;
        this.budget = budget;
        this.messageGenerator = messageGenerator;
        this.messageHandler = messageHandler;

        this.commandRegex = /^\/[a-z]+/;
    }

    handle(contents) {
        this.chatId = contents.message.chat.id;
        this.text = contents.message.text;

        if (contents.message.entities) {
            this.handleCommand();
        } else {
            this.handleMessage();
        }
    }

    handleMessage() {
        const transaction = this.messageHandler.prepareTransaction(this.text, false);

        this.budget.setTransaction(transaction);
        this.telegram.message(this.chatId, this.messageGenerator.getMessage('ok') + '. ' + this.messageGenerator.getMessage('today'));
    }

    handleCommand() {
        const command = this.commandRegex.exec(this.text)[0];

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

    handleStart() {
        this.telegram.message(this.chatId, 'Ну привет');
    }

    handleToday() {
        this.telegram.message(this.chatId, this.messageGenerator.getMessage('today'));
    }

    handleIncome() {
        const transaction = this.messageHandler.prepareTransaction(this.text, true);
        this.budget.setTransaction(transaction);
        this.telegram.message(this.chatId, this.messageGenerator.getMessage('ok'));
    }

    handleUndo() {
        this.budget.undo();
        this.telegram.message(this.chatId, this.messageGenerator.getMessage('undo'));
    }

    handleCommandException() {
        this.telegram.message(this.chatId, 'Всё не то. Давай по новой');
        throw new Error('Something went wrong');
    }

}