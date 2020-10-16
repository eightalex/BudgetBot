import {NumberHandlerInterface} from './NumberHandlerInterface';
import {REGEX_COMMAS, REGEX_DIGITS_IN_BRACES} from '../constants/regex';

export class NumberHandler implements NumberHandlerInterface {
    isFinite(value: any): boolean {
        if (typeof value !== 'number') {
            return false;
        }

        if (value !== value || value === Infinity || value === -Infinity) {
            return false;
        }

        return true;
    };

    makePositive(number: number): number {
        return Math.abs(number);
    }

    makeNegative(number: number): number {
        return number - (number * 2);
    }

    prepareMonoAmount(amount: number): number {
        return Math.ceil(amount / 100);
    }

    prepareValue(value: string | number, makeNegative: boolean = false): number {
        if (typeof value === 'string') {
            value = value.replace(REGEX_COMMAS, '');
            value = parseFloat(value);
        }

        if (!this.isFinite(value)) {
            // TODO make error
            return 0;
        }

        return makeNegative
            ? this.makeNegative(value)
            : this.makePositive(value);
    }

    getValueFromBraces(str: string): number {
        const POSITION_VALUE = 1;
        const result = REGEX_DIGITS_IN_BRACES.exec(str);

        if (result === null) {
            // TODO make error
            return 0;
        }

        return parseInt(result[POSITION_VALUE]);
    }

    getRandomAbsoluteInteger(range: number): number {
        return Math.random() * (range - 1) | 0;
    }
}
