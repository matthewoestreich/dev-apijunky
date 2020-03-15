export default class DateExtended extends Date {
    toFriendlyDateTime = (): string => {
        return `${this.toLocaleDateString()} ${this.toLocaleTimeString()}`;
    };

    static toFriendlyDateTime = (date: Date): string => {
        const d = new DateExtended(date);
        return `${d.toLocaleDateString()} ${d.toLocaleTimeString()}`;
    };

    static nowToFriendlyDateTime = (): string => {
        return DateExtended.toFriendlyDateTime(new Date(Date.now()));
    };
}
