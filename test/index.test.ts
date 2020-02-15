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

ExpectStatus(408, '/', 'GET /', server);

ExpectStatus(404, '/RouteThatDoesNotExist', 'GET /RouteThatDoesNotExist', server);

ExpectStatus(401, '/api/v1/user/test', 'GET /api/v1/user/test **NEED TO REVISIT THIS**', server);
