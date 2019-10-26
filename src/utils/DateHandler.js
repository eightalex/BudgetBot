export default class DateHandler {

    /**
     * Create normalized date for Google Sheets
     * @returns {Date}
     */
    create() {
        const date = new Date();
        
        date.setHours(1);
        date.setMinutes(0);
        date.setSeconds(0);
        
        return date;
    }

}