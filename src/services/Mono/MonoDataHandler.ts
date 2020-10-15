import {NumberHandlerInterface} from '../../utils/NumberHandlerInterface';
import {BudgetInterface} from '../BudgetInterface';
import {MessageHandlerInterface} from '../Message/MessageHandlerInterface';
import {MonoDataHandlerInterface} from './MonoDataHandlerInterface';
import {MonoType} from '../../types/Mono';

export class MonoDataHandler implements MonoDataHandlerInterface {
    constructor(
        private readonly budget: BudgetInterface,
        private readonly numberHandler: NumberHandlerInterface,
        private readonly messageHandler: MessageHandlerInterface,
    ) {}

    private isSpecificAccount(): boolean {
        return process.env.MONO_ACCOUNT_ID !== 'all';
    }

    private isRequiredAccount(accountID: string): boolean {
        return process.env.MONO_ACCOUNT_ID === accountID;
    }

    handle(contents: MonoType.WebHook): void {
        const accountID = contents.data.account;

        if (this.isSpecificAccount() && !this.isRequiredAccount(accountID)) {
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
}
