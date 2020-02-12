import 'mocha';
import request from 'supertest';
import { expect } from 'chai';

import { server } from '../src';
import is from '../src/utils/validation';

import { ExpectStatus } from './helpers';

after(done => server.close(done));

describe('Volkswagen Test', () => {
    it('should always pass', () => {
        expect(true)
            .to
            .equal(true);
    });
});

ExpectStatus(200, '/', 'GET /', server);

ExpectStatus(404, '/RouteThatDoesNotExist', 'GET /RouteThatDoesNotExist', server);

ExpectStatus(200, '/api/v1/test', 'GET /api/v1/test', server);

describe('Utils - Testing Validations', () => {
    it('is a valid email address [need to revisit this]', done => {
        const testEmail = is.email();
        expect(testEmail('test')).to.equal('Must be a valid email');
        done();
    })
});
