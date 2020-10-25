import {MessageKeys} from '../../Message/MessageGenerator/MessageKeys';
import {CommandInterface} from '../CommandInterface';

export class Undo implements CommandInterface {
    handle(dependencies, data): void {
        dependencies.budget.undoLastTransaction();
        dependencies.telegram.message(data.chatId, dependencies.messageGenerator.getMessage(MessageKeys.Undo));
    }
}
