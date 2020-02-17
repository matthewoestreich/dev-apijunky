export const addMillisecondsToDate = (date: Date, ms: number): Date => {
    const dateObj = new Date(date.valueOf());
    dateObj.setMilliseconds(dateObj.getMilliseconds() + ms);
    return dateObj;
};

export class DateExtended extends Date {
    toFriendlyDateTime = (): string => {
        return `${this.toLocaleDateString()} ${this.toLocaleTimeString()}`;
    };

    static nowToFriendlyDateTime = (): string => {
        const d = new DateExtended(DateExtended.now());
        return `${d.toLocaleDateString()} ${d.toLocaleTimeString()}`;
    };
}
