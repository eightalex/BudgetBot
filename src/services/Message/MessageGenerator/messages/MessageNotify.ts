import {DELIMITER_NEW_LINE, DELIMITER_DOT, DELIMITER_SPACE} from '../../../../constants/delimiter';
import {messages} from '../../../../data/messages';
import {AbstractMessage} from '../AbstractMessage';
import {MessageInterface} from '../MessageInterface';

export class MessageNotify extends AbstractMessage implements MessageInterface {
    getMessage(): string {
        return this.compose([
            this.getRandomMessage(messages.morning),
            DELIMITER_NEW_LINE,
            DELIMITER_NEW_LINE,
            this.getRandomMessage(messages.week),
            DELIMITER_SPACE,
            this.messageHelpers.budget.getBudgetForWeek(),
            DELIMITER_SPACE,
            this.currency,
            DELIMITER_DOT,
            DELIMITER_NEW_LINE,
            this.getRandomMessage(messages.month),
            DELIMITER_SPACE,
            this.messageHelpers.budget.getBudgetForMonth(),
            DELIMITER_SPACE,
            this.currency,
        ]);
    }
}
