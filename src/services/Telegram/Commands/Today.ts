import {MessageKeys} from '../../Message/MessageGenerator/MessageKeys';
import {CommandInterface} from '../CommandInterface';

export class Today implements CommandInterface {
    handle(dependencies, data): void {
        dependencies.telegram.message(data.chatId, dependencies.messageGenerator.getMessage(MessageKeys.TodayBudget));
    }
}
