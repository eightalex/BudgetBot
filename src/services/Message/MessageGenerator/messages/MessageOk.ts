import {messages} from '~/data/messages';
import {AbstractMessage} from '../AbstractMessage';
import {MessageInterface} from '../MessageInterface';

export class MessageOk extends AbstractMessage implements MessageInterface {
    getMessage(): string {
        return this.getRandomMessage(messages.ok);
    }
}
