const { initializeExpress } = require('../dist/index.js');

let server;

beforeAll(done => {
    server = initializeExpress(done);
});

afterAll(done => {
    server.close(done);
});
