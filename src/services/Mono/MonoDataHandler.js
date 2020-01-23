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
        const accountID = contents.data.account;

        if (this.isSpecificAccount(accountID) && !this.isRequiredAccount(accountID)) {
            return;
        }

        const monoAmount = contents.data.statementItem.amount;
        const monoDescription = contents.data.statementItem.description;
        const amount = this.numberHandler.prepareMonoAmount(monoAmount);
        const isIncome = amount > 0;
        const value = this.numberHandler.prepareValue(amount, isIncome);
        const comment = this.messageHandler.prepareComment(monoDescription, value);

        this.budget.setTransaction({comment, value});
    }

    /**
     * @param {string} accountID
     */
    isSpecificAccount(accountID) {
        return process.env.MONO_ACCOUNT_ID !== 'all';
    }

    /**
     * @param {string} accountID
     */
    isRequiredAccount(accountID) {
        return process.env.MONO_ACCOUNT_ID === accountID;
    }

}