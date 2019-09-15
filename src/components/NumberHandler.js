export default class NumberHandler {

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
     * @param {string} value
     * @param {boolean} makeNegative
     * @return {number}
     */
    prepareValue(value, makeNegative = false) {
        const number = parseFloat(value);

        if (!number) {
            return 0;
        }

        return makeNegative ? this.makeNegative(number) : this.makePositive(number);
    }

}