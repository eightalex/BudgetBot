import {MONO} from '~/config/mono';
import {REGEX} from '~/constants/regex';
import {DELIMITER} from '~/constants/delimiter';
import {TransactionType} from '~/types/TransactionType';
import {NumberHandlerInterface} from '~/utils/NumberHandlerInterface';
import {StringHandlerInterface} from '~/utils/StringHandlerInterface';
import {HandleError} from '~/services/Error';
import {MessageHandlerInterface} from './MessageHandlerInterface';

export class MessageHandler implements MessageHandlerInterface {
    constructor(
        private readonly numberHandler: NumberHandlerInterface,
        private readonly stringHandler: StringHandlerInterface,
    ) {}

    prepareComment(comment: string, value: number, options: {isTelegramMessage?: boolean} = {}): string {
        if (!comment) {
            throw new HandleError('Error while preparing comment');
        }

        comment = comment.trim();
        comment = this.stringHandler.removeNewLine(comment);
        comment = this.stringHandler.capitalize(comment);

        if (options && options.isTelegramMessage) {
            comment = this.extendCommentForTelegramMessage(comment, value);
        } else {
            comment = this.extendCommentForSheets(comment, value);
        }

        return comment;
    }

    prepareTransaction(inputMessage: string): TransactionType {
        const message = this.stringHandler.removeCommand(inputMessage);
        const valueResult = REGEX.DIGITS.exec(message);
        const commentResult = REGEX.WORDS.exec(message);

        if (valueResult === null || commentResult === null) {
            throw new HandleError('Error while preparing transaction');
        }

        const id = this.stringHandler.makeId(MONO.ID_LENGTH);
        const value = this.numberHandler.prepareValue(valueResult[0], false);
        const comment = this.prepareComment(commentResult[0], value);

        return {
            id,
            value,
            comment,
        };
    }

    prepareUndo(currentValue: number, currentComment: string): TransactionType {
        const comments = currentComment.split(DELIMITER.COMMA);
        const lastComment = comments.pop();
        const previousValue = this.numberHandler.getValueFromBraces(lastComment as string);

        return {
            id: this.stringHandler.makeId(MONO.ID_LENGTH),
            value: currentValue - previousValue,
            comment: comments.join(DELIMITER.COMMA),
        };
    }

    private extendCommentForTelegramMessage(comment: string, value: number): string {
        return this.stringHandler.compose([
            comment,
            DELIMITER.SPACE,
            DELIMITER.DASH,
            DELIMITER.SPACE,
            value.toString(),
            DELIMITER.SPACE,
            process.env.CURRENCY_ACRONYM as string,
        ]);
    }

    private extendCommentForSheets(comment: string, value: number): string {
        return comment + DELIMITER.SPACE + this.stringHandler.wrapByBraces(value);
    }
}
