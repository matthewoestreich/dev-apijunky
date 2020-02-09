module.exports = {
    require: ["ts-node/register", "source-map-support/register"],
    bail: true,
    'full-trace': true,
    timeout: 2000,
    spec: ["test/**/*.test.ts"]
};
