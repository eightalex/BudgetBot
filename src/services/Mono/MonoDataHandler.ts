import {NumberHandlerInterface} from '../../utils/NumberHandlerInterface';
import {BudgetInterface} from '../BudgetInterface';
import {HandleError} from '../Error';
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

        if (this.isSpecificAccount()) {
            throw new HandleError('Skip transaction from another card');
        }

        if (!this.isRequiredAccount(accountID)) {
            throw new HandleError('Problem with handle mono account');
        }

        const {amount, description} = contents.data.statementItem;
        const monoAmount = this.numberHandler.prepareMonoAmount(amount);
        const isIncome = monoAmount > 0;
        const value = this.numberHandler.prepareValue(monoAmount, isIncome);
        const comment = this.messageHandler.prepareComment(description, value);

        this.budget.setTransaction({comment, value});
    }
}
