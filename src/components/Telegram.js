export default class Telegram {

    constructor() {
        this.token = process.env.TELEGRAM_TOKEN;
        this.googleAppUrl = process.env.GOOGLE_APP_URL;
    }

    /**
     * @param method {string}
     * @param params {object}
     * @return {Promise<Response>}
     */
    post(method, params) {
        const url = 'https://api.telegram.org/bot' + this.token + '/' + method;
        return UrlFetchApp.fetch(url, {'method': 'post', 'payload': params});
    }

    /**
     * @param chat_id {string|number}
     * @param text {string}
     */
    message(chat_id, text) {
        this.post('sendMessage', {chat_id, text});
    }

    /**
     * @return {Promise<Response>}
     */
    setWebhook() {
        return UrlFetchApp.fetch('https://api.telegram.org/bot' + this.token + "/setWebhook?url=" + this.googleAppUrl);
    }

}