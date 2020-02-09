const request = require('request');

const port = process.env.PORT || 3000;
const base_url = 'http://localhost:' + port;

describe('Hello World Server', () => {
    describe('GET /', () => {
        it('returns status code 200', done => {
            request.get(base_url, (error, response, body) => {
                expect(response.statusCode).toBe(200);
                done();
            });
        });
    });
});
