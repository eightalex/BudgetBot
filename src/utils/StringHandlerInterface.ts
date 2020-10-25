import {CommandType} from '../types/Telegram/CommandType';

export interface StringHandlerInterface {
    removeCommand(str: string): string
    removeNewLine(str: string): string
    capitalize(str: string): string
    wrapByBraces(str: string | number): string
    getCommand(str: string): CommandType
    compose(strings: string[]): string
}
