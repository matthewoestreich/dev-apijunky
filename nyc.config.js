module.exports = {
    include: ['src/**/*.ts'],
    exclude: ['src/utils/validation.ts'],
    extension: ['.ts'],
    require: ['ts-node/register'],
    reporter: ['text', 'html', 'lcov'],
    sourceMap: true,
    instrument: true,
};
