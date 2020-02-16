/* eslint-disable no-bitwise */
const newGuid = (): string => {
    return 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
        const r = (Math.random() * 16) | 0;
        const v = c === 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
};
/* eslint-disable no-bitwise */

export const createGuid = (length?: number, removeDashes?: boolean): string => {
    const results = ([...Array(length || 1)].map(_ => newGuid()) as unknown) as string;
    return removeDashes ? results.replace(/-/g, '') : results;
};
