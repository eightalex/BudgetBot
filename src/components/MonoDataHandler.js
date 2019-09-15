export default class MonoDataHandler {

    /**
     * @param {Budget} budget
     * @param {NumberHandler} numberHandler
     * @param {MessageHandler} messageHandler
     */
    constructor(budget, numberHandler, messageHandler) {
        this.budget = budget;
        this.numberHandler = numberHandler;
        this.messageHandler = messageHandler;
    }

    handle(contents) {
        const amount = this.numberHandler.prepareMonoAmount(contents.data.statementItem.amount);
        const isIncome = amount > 0;
        const value = this.numberHandler.prepareValue(amount, isIncome);
        const comment = this.messageHandler.prepareComment(contents.data.statementItem.description, value);

        this.budget.setTransaction({comment, value});
    }

}