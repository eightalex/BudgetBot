export default class MessageHandler {

    /**
     * @param text - input message
     * @return {{value: number, comment: string}}
     */
    prepareExpense(text) {
        const digitsRegex = /([0-9]+([.][0-9]*)?|[.][0-9]+)/;
        const wordsRegex = /([аАaA-яЯzZ]+ ?)+/;

        const valueResult = digitsRegex.exec(text);
        const commentResult = wordsRegex.exec(text);

        const value = valueResult ? parseInt(valueResult[0], 10) : 0;
        const comment = commentResult ? commentResult[0].trim() : '';

        return {value, comment};
    }

}