import {MessageKeys} from '~/services/Message/MessageGenerator/MessageKeys';
import {CommandInterface} from '~/services/Telegram/CommandInterface';

export class Today implements CommandInterface {
    handle(dependencies, data): void {
        dependencies.telegram.message(data.chatId, dependencies.messageGenerator.getMessage(MessageKeys.TodayBudget));
    }
}
