/**
 * This method strips all ANSI characters from a string. For example,
 * you can use this to clear the color that `chalk` puts on strings.
 */
export default ({ onlyFirst = false } = {}): RegExp => {
    const pattern =
        '[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:[a-zA-Z\\d]*(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?\\u0007)|(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-ntqry=><~]))';
    return new RegExp(pattern, onlyFirst ? undefined : 'g');
};
