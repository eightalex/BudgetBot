export default class MonoDataHandler {

    /**
     * @param {Budget} budget
     * @param {TelegramAdapter} telegram
     * @param {NumberHandler} numberHandler
     * @param {MessageHandler} messageHandler
     * @param {MessageGenerator} messageGenerator
     */
    constructor(budget, telegram, numberHandler, messageHandler, messageGenerator) {
        this.budget = budget;
        this.telegram = telegram;
        this.numberHandler = numberHandler;
        this.messageHandler = messageHandler;
        this.messageGenerator = messageGenerator;
    }

    /**
     * @param {json} contents
     */
    handle(contents) {
        const monoAmount = contents.data.statementItem.amount;
        const monoDescription = contents.data.statementItem.description;
        const amount = this.numberHandler.prepareMonoAmount(monoAmount);
        const isIncome = amount > 0;
        const value = this.numberHandler.prepareValue(amount, isIncome);
        const commentSheets = this.messageHandler.prepareComment(monoDescription, value);
        const commentTelegram = this.messageHandler.prepareComment(monoDescription, value, {isTelegramMessage: true});

        this.budget.setTransaction({comment: commentSheets, value});
        this.telegram.message(process.env.CHAT_ID, this.messageGenerator.getMessage('transaction', {
            comment: commentTelegram
        }));
    }

}