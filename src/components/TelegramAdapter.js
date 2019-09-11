export default class TelegramAdapter {

    constructor() {
        this.token = process.env.TELEGRAM_TOKEN;
        this.googleAppUrl = process.env.GOOGLE_APP_URL;
        this.apiUrl = 'https://api.telegram.org/bot';
    }

    /**
     * @param method {string}
     * @param params {object}
     * @return {Promise<Response>}
     */
    post(method, params) {
        const url = this.apiUrl + this.token + '/' + method;
        return UrlFetchApp.fetch(url, {'method': 'post', 'payload': params});
    }

    /**
     * @param chat_id {string|number}
     * @param text {string}
     * @param options {object}
     */
    message(chat_id, text, options = {}) {
        this.post('sendMessage', Object.assign({chat_id, text}, options));
    }

    /**
     * @return {Promise<Response>}
     */
    setWebhook() {
        return UrlFetchApp.fetch(this.apiUrl + this.token + '/setWebhook?url=' + this.googleAppUrl);
    }

}