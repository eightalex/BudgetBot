import {DateHandlerInterface} from './DateHandlerInterface';

export class DateHandler implements DateHandlerInterface {
    /**
     * Create normalized date for Google Sheets
     */
    create(date?: Date): Date {
        date = date || new Date();

        date.setHours(1);
        date.setMinutes(0);
        date.setSeconds(0);

        return date;
    }

    getWeekEnd(): Date {
        const today = this.create();
        const dayCurrent = today.getDay();
        const dayWeekStart = today.getDate() - dayCurrent + (dayCurrent === 0 ? -6 : 1); // adjust when day is sunday
        const dayWeekEnd = dayWeekStart + 6;

        return new Date(today.setDate(dayWeekEnd));
    }
}
