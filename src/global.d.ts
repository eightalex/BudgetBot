declare module NodeJS {
    interface Global {
        sendNotify(): void
        doPost(event: GoogleAppsScript.Events.DoPost): void
        setWebhook(): void
    }
}
