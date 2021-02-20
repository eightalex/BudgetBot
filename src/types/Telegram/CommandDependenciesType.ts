import {BudgetInterface} from '~/services/BudgetInterface';
import {MessageGeneratorInterface} from '~/services/Message/MessageGenerator/MessageGeneratorInterface';
import {MessageHandlerInterface} from '~/services/Message/MessageHandlerInterface';
import {AdapterInterface} from '~/services/Telegram';

export type CommandDependenciesType = {
    telegram: AdapterInterface
    budget: BudgetInterface
    messageGenerator: MessageGeneratorInterface
    messageHandler: MessageHandlerInterface
};
