import {MonoAdapterInterface} from './MonoAdapterInterface';

export class MonoAdapter implements MonoAdapterInterface {
    private readonly token = process.env.MONO_TOKEN;
    private readonly googleAppUrl = process.env.GOOGLE_APP_URL;
    private readonly apiUrl = 'https://api.monobank.ua';

    setWebhook(): GoogleAppsScript.URL_Fetch.HTTPResponse {
        const options: GoogleAppsScript.URL_Fetch.URLFetchRequestOptions = {
            method: 'post',
            contentType: 'application/json',
            headers: {
                'X-Token': this.token as string,
            },
            payload: JSON.stringify({
                webHookUrl: this.googleAppUrl
            })
        };

        return UrlFetchApp.fetch(this.apiUrl + '/personal/webhook', options);
    }
}
