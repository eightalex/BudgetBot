export default class NumberHandler {

    constructor() {

    }

    /**
     * @param number {number}
     * @return {number}
     */
    makePositive(number) {
        return Math.abs(number);
    }

    /**
     * @param number {number}
     * @return {number}
     */
    makeNegative(number) {
        return number - (number * 2);
    }

    /**
     * @param value {string}
     * @param makeNegative {boolean}
     * @return {number}
     */
    prepareValue(value, makeNegative = false) {
        const number = parseFloat(value);

        if (!number) {
            return 0;
        }

        return makeNegative ? this.makeNegative(number) : number;
    }

}