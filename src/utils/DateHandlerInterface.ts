export interface DateHandlerInterface {
    create(date?: Date): Date
    getWeekEnd(): Date
    addDays(date: Date, days: number): Date
}
