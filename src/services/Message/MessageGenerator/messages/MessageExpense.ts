import {DELIMITER_DOT} from '../../../../constants/delimiter';
import {AbstractMessage} from '../AbstractMessage';
import {MessageInterface} from '../MessageInterface';
import {MessageKeys} from '../MessageKeys';
import {MessagePoolInterface} from '../MessagePoolInterface';

export class MessageExpense extends AbstractMessage implements MessageInterface {
    getMessage(messagePool: MessagePoolInterface): string {
        return this.compose([
            messagePool.get(MessageKeys.Ok).getMessage(),
            DELIMITER_DOT,
            messagePool.get(MessageKeys.TodayBudget).getMessage(),
        ]);
    }
}
