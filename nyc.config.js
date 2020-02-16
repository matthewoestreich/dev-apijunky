module.exports = {
    include: ['src/**/*.ts'],
    exclude: ['src/utils/typeorm/validation.ts', 'src/docs/**/*.*'],
    extension: ['.ts'],
    require: ['ts-node/register'],
    reporter: ['text', 'html', 'lcov'],
    sourceMap: true,
    instrument: true,
};
