import 'mocha';
import request from 'supertest';
import { expect } from 'chai';

import { server } from '../src';
import is from '../src/utils/validation';

after(done => server.close(done));

describe('Volkswagen Test', () => {
    it('should always pass', () => {
        expect(true)
            .to
            .equal(true);
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

describe('GET /RouteThatDoesNotExist', () => {
    const path = '/RouteThatDoesNotExist';
    it('responds with status of 404', done => {
        request(server)
            .get(path)
            .expect(404, done);
    })
});

describe('Utils - Testing Validations', () => {
    it('is a valid email address [need to revisit this]', done => {
        const testEmail = is.email();
        expect(testEmail('test')).to.equal('Must be a valid email');
        done();
    })
});
