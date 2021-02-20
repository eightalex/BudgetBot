import {DELIMITER} from '~/constants/delimiter';
import {messages} from '~/data/messages';
import {AbstractMessage} from '../AbstractMessage';
import {MessageInterface} from '../MessageInterface';
import {MessageKeys} from '../MessageKeys';
import {MessagePoolInterface} from '../MessagePoolInterface';

export class MessageUndo extends AbstractMessage implements MessageInterface {
    getMessage(messagePool: MessagePoolInterface): string {
        return this.compose([
            this.getRandomMessage(messages.undo),
            DELIMITER.DOT,
            messagePool.get(MessageKeys.TodayBudget).getMessage(),
        ]);
    }
}
