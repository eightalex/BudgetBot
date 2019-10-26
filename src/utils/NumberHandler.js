import {REGEX_COMMAS} from '../constants/Regex';

export default class NumberHandler {

    /**
     * @param {number} value
     * @returns {boolean}
     */
    isFinite(value) {
        if (typeof value !== 'number') {
            return false;
        }

        if (value !== value || value === Infinity || value === -Infinity) {
            return false;
        }

        return true;
    };

    /**
     * @param {number} number
     * @return {number}
     */
    makePositive(number) {
        return Math.abs(number);
    }

    /**
     * @param {number} number
     * @return {number}
     */
    makeNegative(number) {
        return number - (number * 2);
    }

    /**
     * @param {number} amount
     * @return {number}
     */
    prepareMonoAmount(amount) {
        return Math.ceil(amount / 100);
    }

    /**
     * @param {string|number} value
     * @param {boolean} makeNegative
     * @return {number}
     */
    prepareValue(value, makeNegative = false) {
        if (!value) {
            return 0; // TODO make error
        }

        value = this.isFinite(value) ? value : value.replace(REGEX_COMMAS, '');
        value = parseFloat(value);

        return makeNegative
            ? this.makeNegative(value)
            : this.makePositive(value);
    }

}