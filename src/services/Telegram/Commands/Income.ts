import {MessageKeys} from '~/services/Message/MessageGenerator/MessageKeys';
import {CommandInterface} from '~/services/Telegram/CommandInterface';

export class Income implements CommandInterface {
    handle(dependencies, data): void {
        const transaction = dependencies.messageHandler.prepareTransaction(data.text, true);
        dependencies.budget.setTransaction(transaction);
        dependencies.telegram.message(data.chatId, dependencies.messageGenerator.getMessage(MessageKeys.Ok));
    }
}
