import {MessageKeys} from '../../Message/MessageGenerator/MessageKeys';
import {CommandInterface} from '../CommandInterface';

export class Start implements CommandInterface {
    handle(dependencies, data): void {
        dependencies.telegram.message(data.chatId, dependencies.messageGenerator.getMessage(
            MessageKeys.Start,
            {
                chatId: data.chatId.toString(),
            },
        ));
    }
}
