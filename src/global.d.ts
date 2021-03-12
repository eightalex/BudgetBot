declare module NodeJS {
    interface Global {
        sendNotify(): void
        markCurrentDay(): void
        doPost(event: GoogleAppsScript.Events.DoPost): void
        setWebhook(): void
    }
}
