import {REGEX_DIGITS, REGEX_WORDS} from '../../constants/regex';
import {DELIMITER_WORD, DELIMITER_TRANSACTION, DELIMITER_DASH} from '../../constants/delimiter';
import {TransactionType} from '../../types/TransactionType';
import {NumberHandlerInterface} from '../../utils/NumberHandlerInterface';
import {StringHandlerInterface} from '../../utils/StringHandlerInterface';
import {HandleError} from '../Error';
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

    prepareTransaction(inputMessage: string, isIncome: boolean): TransactionType {
        const message = this.stringHandler.removeCommand(inputMessage);
        const valueResult = REGEX_DIGITS.exec(message);
        const commentResult = REGEX_WORDS.exec(message);

        if (valueResult === null || commentResult === null) {
            throw new HandleError('Error while preparing transaction');
        }

        const value = this.numberHandler.prepareValue(valueResult[0], isIncome);
        const comment = this.prepareComment(commentResult[0], value);

        return {
            value,
            comment,
        };
    }

    prepareUndo(currentValue: number, currentComment: string): TransactionType {
        const comments = currentComment.split(DELIMITER_TRANSACTION);
        const lastComment = comments.pop();
        const previousValue = this.numberHandler.getValueFromBraces(lastComment as string);

        return {
            value: currentValue - previousValue,
            comment: comments.join(DELIMITER_TRANSACTION),
        };
    }

    private extendCommentForTelegramMessage(comment: string, value: number): string {
        return comment
            + DELIMITER_WORD
            + DELIMITER_DASH
            + DELIMITER_WORD
            + value
            + DELIMITER_WORD
            + process.env.CURRENCY_ACRONYM;
    }

    private extendCommentForSheets(comment: string, value: number): string {
        return comment + DELIMITER_WORD + this.stringHandler.wrapByBraces(value);
    }
}
