import {cells} from '../../../../config/cells';
import {DELIMITER} from '../../../../constants/delimiter';
import {messages} from '../../../../data/messages';
import {AbstractMessage} from '../AbstractMessage';
import {MessageInterface} from '../MessageInterface';

export class MessageTodayBudget extends AbstractMessage implements MessageInterface {
    getMessage(): string {
        return this.compose([
            this.getRandomMessage(messages.today),
            DELIMITER.SPACE,
            this.messageHelpers.spreadsheetAppAdapter.getCell(cells.balance).getDisplayValue(),
            DELIMITER.SPACE,
            this.currency,
        ]);
    }
}
