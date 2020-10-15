import {TelegramAdapterInterface} from './TelegramAdapterInterface';

export class TelegramAdapter implements TelegramAdapterInterface {
    private readonly token = process.env.TELEGRAM_TOKEN;
    private readonly googleAppUrl = process.env.GOOGLE_APP_URL;
    private readonly apiUrl = `https://api.telegram.org/bot${this.token}/`;

    post(method: string, payload: object): GoogleAppsScript.URL_Fetch.HTTPResponse {
        const url = this.apiUrl + method;
        return UrlFetchApp.fetch(url, {method: 'post', payload});
    }

    message(chat_id: string | number, text: string, payload: object = {}): GoogleAppsScript.URL_Fetch.HTTPResponse {
        return this.post('sendMessage', Object.assign({chat_id, text}, payload));
    }

    setWebhook(): GoogleAppsScript.URL_Fetch.HTTPResponse {
        return UrlFetchApp.fetch(this.apiUrl + 'setWebhook?url=' + this.googleAppUrl);
    }
}
