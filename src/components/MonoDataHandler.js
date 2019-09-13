export default class MonoDataHandler {

    constructor(budget, numberHandler, messageHandler) {
        this.budget = budget;
        this.numberHandler = numberHandler;
        this.messageHandler = messageHandler;
    }

    handle(contents) {
        const isIncome = contents.data.statementItem.amount > 0;
        const value = this.numberHandler.prepareValue(contents.data.statementItem.amount, isIncome);
        const comment = this.messageHandler.prepareComment(contents.data.statementItem.description, value);

        this.budget.setTransaction({comment, value});
    }

}