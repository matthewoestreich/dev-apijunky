// eslint-disable-next-line @typescript-eslint/explicit-function-return-type, @typescript-eslint/no-explicit-any
export function omit(key: string, obj: any) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { [key]: omitted, ...rest } = obj;
    return rest;
}
