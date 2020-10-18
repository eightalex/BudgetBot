import {REGEX_NEW_LINE, REGEX_COMMAND} from '../constants/regex';
import {DELIMITER} from '../constants/delimiter';
import {HandleError} from '../services/Error';
import {StringHandlerInterface} from './StringHandlerInterface';

export class StringHandler implements StringHandlerInterface {
    removeCommand(str: string): string {
        return str.replace(REGEX_COMMAND, '');
    }

    removeNewLine(str: string): string {
        return str.replace(REGEX_NEW_LINE, DELIMITER.SPACE);
    }

    capitalize(str: string): string {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    wrapByBraces(str: string | number): string {
        return '(' + str + ')';
    }

    /**
     * Returns command like '/start'
     */
    getCommand(str: string): string {
        const INDEX_FIRST = 0;
        const commands = REGEX_COMMAND.exec(str);

        if (commands === null || !Boolean(commands[INDEX_FIRST])) {
            throw new HandleError('Get command error');
        }

        return commands[INDEX_FIRST];
    }

    compose(strings: string[]): string {
        return strings.join('');
    }
}
