import 'mocha';
import request from 'supertest';
import { expect } from 'chai';
import { server } from '../src';

after(done => server.close(done));

describe('Volkswagen Test', () => {
    it('should always pass', () => {
        expect(true).to.equal(true);
    });
});

describe('GET /', () => {
    const path = '/';
    it('responds with status of 200', done => {
        request(server)
            .get(path)
            .expect(200, done);
    });
});
