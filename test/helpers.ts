import 'mocha';
import request from 'supertest';
import { expect } from 'chai';

import { Server } from 'http';

export const ExpectStatus = (status: number, path: string, description: string, server: Server) => {
    describe(description, () => {
        it('responds with status of ' + status, done => {
            request(server)
                .get(path)
                .expect(status, done);
        });
    });
}