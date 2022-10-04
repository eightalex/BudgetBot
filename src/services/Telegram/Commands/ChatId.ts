import {CommandInterface} from '~/services/Telegram/CommandInterface';

export class ChatId implements CommandInterface {
    handle(dependencies, data): void {
        dependencies.telegram.message(data.chatId, String(data.chatId));
    }
}
