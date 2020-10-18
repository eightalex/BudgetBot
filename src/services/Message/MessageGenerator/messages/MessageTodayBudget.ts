import {DELIMITER} from '../../../../constants/delimiter';
import {messages} from '../../../../data/messages';
import {AbstractMessage} from '../AbstractMessage';
import {MessageInterface} from '../MessageInterface';

export class MessageTodayBudget extends AbstractMessage implements MessageInterface {
    getMessage(): string {
        return this.compose([
            this.getRandomMessage(messages.today),
            DELIMITER.SPACE,
            this.messageHelpers.budget.getTodayBudget(),
            DELIMITER.SPACE,
            this.currency,
        ]);
    }
}
