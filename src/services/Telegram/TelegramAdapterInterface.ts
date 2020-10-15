export interface TelegramAdapterInterface {
    post(method: string, payload: object): GoogleAppsScript.URL_Fetch.HTTPResponse
    message(chat_id: string | number, text: string, payload?: object): GoogleAppsScript.URL_Fetch.HTTPResponse
    setWebhook(): GoogleAppsScript.URL_Fetch.HTTPResponse
}
