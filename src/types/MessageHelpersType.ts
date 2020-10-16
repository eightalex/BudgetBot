import {BudgetInterface} from '../services/BudgetInterface';
import {NumberHandlerInterface} from '../utils/NumberHandlerInterface';
import {StringHandlerInterface} from '../utils/StringHandlerInterface';

export type MessageHelpersType = {
    budget: BudgetInterface
    numberHandler: NumberHandlerInterface
    stringHandler: StringHandlerInterface
}
