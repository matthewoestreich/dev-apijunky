const { initializeExpress } = require('../dist/index.js');
const request = require('request');

const port = process.env.PORT || 3000;
const base_url = 'http://localhost:' + port;

let server;

describe('Hello World Server', () => {
    beforeEach(done => {
        server = initializeExpress(done);
    });

    afterEach(done => {
        server.close(done);
    })

    describe('GET /', () => {
        it('returns status code 200', done => {
            request.get(base_url, (error, response, body) => {
                expect(response.statusCode).toBe(200);
                done();
            });
        });
    });
});
