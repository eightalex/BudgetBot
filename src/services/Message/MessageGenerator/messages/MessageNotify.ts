import {DELIMITER} from '../../../../constants/delimiter';
import {messages} from '../../../../data/messages';
import {AbstractMessage} from '../AbstractMessage';
import {MessageInterface} from '../MessageInterface';

export class MessageNotify extends AbstractMessage implements MessageInterface {
    getMessage(): string {
        return this.compose([
            this.getRandomMessage(messages.morning),
            DELIMITER.NEW_LINE,
            DELIMITER.NEW_LINE,
            this.getRandomMessage(messages.week),
            DELIMITER.SPACE,
            this.messageHelpers.budget.getBudgetForWeek(),
            DELIMITER.SPACE,
            this.currency,
            DELIMITER.DOT,
            DELIMITER.NEW_LINE,
            this.getRandomMessage(messages.month),
            DELIMITER.SPACE,
            this.messageHelpers.budget.getBudgetForMonth(),
            DELIMITER.SPACE,
            this.currency,
        ]);
    }
}
