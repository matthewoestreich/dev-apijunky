// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const omit = (keysToOmit: string[], obj: any): object => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return Object.keys(obj).reduce((result: any, key: string) => {
        // eslint-disable-next-line no-param-reassign
        if (!keysToOmit.includes(key)) result[key] = obj[key];
        return result;
    }, {});
};

export const addMillisecondsToDate = (date: Date, ms: number): Date => {
    const dateObj = new Date(date.valueOf());
    dateObj.setMilliseconds(dateObj.getMilliseconds() + ms);
    return dateObj;
};
