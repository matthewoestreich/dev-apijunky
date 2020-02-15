export const addMillisecondsToDate = (date: Date, ms: number): Date => {
    const dateObj = new Date(date.valueOf());
    dateObj.setMilliseconds(dateObj.getMilliseconds() + ms);
    return dateObj;
};

export class DateExtended extends Date {
    toFriendlyDate = (): string => {
        return `${this.toLocaleDateString()} ${this.toLocaleTimeString()}`;
    };
}
