export default class DateHandler {

    /**
     * Create normalized date for Google Sheets
     * @param {Date} [date]
     * @returns {Date}
     */
    create(date) {
        date = date || new Date();

        date.setHours(1);
        date.setMinutes(0);
        date.setSeconds(0);

        return date;
    }

    /**
     * @returns {Date}
     */
    getWeekEnd() {
        const today = this.create();
        const dayWeekStart = today.getDate() - today.getDay() + 1;
        const dayWeekEnd = dayWeekStart + 6;

        return new Date(today.setDate(dayWeekEnd));
    }

}