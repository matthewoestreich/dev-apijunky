// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const omit = (obj: any, keysToOmit: string[]): object => {
    const objKeys = Object.keys(obj);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return objKeys.reduce((result: any, key: string) => {
        // eslint-disable-next-line no-param-reassign
        if (!keysToOmit.includes(key)) result[key] = obj[key];
        return result;
    }, {});
};
