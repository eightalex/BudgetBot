export default class MessageHandler {

    constructor() {

    }

    /**
     * @param text - input message
     * @return {{comment: string, value: string}}
     */
    prepareExpense(text) {
        const digitsRegex = /([0-9]+([.][0-9]*)?|[.][0-9]+)/;
        const phrasesRegex = /([аАaA-яЯzZ]+ ?)+/;

        const value = digitsRegex.exec(text);
        const comment = phrasesRegex.exec(text);

        return {
            value: value ? value[0] : '0',
            comment: comment ? comment[0] : ''
        };
    }

}