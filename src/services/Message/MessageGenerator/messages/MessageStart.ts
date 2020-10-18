import {DELIMITER} from '../../../../constants/delimiter';
import {messages} from '../../../../data/messages';
import {MessageOptionsType} from '../../../../types/MessageOptionsType';
import {AbstractMessage} from '../AbstractMessage';
import {MessageInterface} from '../MessageInterface';
import {MessagePoolInterface} from '../MessagePoolInterface';

export class MessageStart extends AbstractMessage implements MessageInterface {
    getMessage(messagePool: MessagePoolInterface, options: MessageOptionsType): string {
        const chatId = options.chatId === undefined ? '0' : options.chatId;

        return this.compose([
            this.getRandomMessage(messages.start),
            DELIMITER.SPACE,
            chatId,
        ]);
    }
}
