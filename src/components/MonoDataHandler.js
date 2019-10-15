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
        const amount = this.numberHandler.prepareMonoAmount(contents.data.statementItem.amount);
        const isIncome = amount > 0;
        const value = this.numberHandler.prepareValue(amount, isIncome);
        const comment = this.messageHandler.prepareComment(contents.data.statementItem.description, value);

        this.budget.setTransaction({comment, value});
        this.telegram.message(process.env.CHAT_ID, this.messageGenerator.getMessage('today'));
    }

}