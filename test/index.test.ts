import 'mocha';
import request from 'supertest';
import { expect } from 'chai';
import { red } from 'chalk';

import { server } from '../src';

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

ExpectStatus(401, '/api/v1/user/test', `GET /api/v1/user/test ${red('**NEED TO REVISIT THIS**')}`, server);
