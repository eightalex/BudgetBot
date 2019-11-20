export default class MonoAdapter {

    constructor() {
        this.token = process.env.MONO_TOKEN;
        this.googleAppUrl = process.env.GOOGLE_APP_URL;
        this.apiUrl = 'https://api.monobank.ua';
    }

    /**
     * @return {Promise<Response>}
     */
    setWebhook() {
        const options = {
            method: 'post',
            contentType: 'application/json',
            headers: {
                'X-Token': this.token
            },
            payload: JSON.stringify({
                webHookUrl: this.googleAppUrl
            })
        };

        return UrlFetchApp.fetch(this.apiUrl + '/personal/webhook', options);
    }

}