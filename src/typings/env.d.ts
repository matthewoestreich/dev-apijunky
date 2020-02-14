import { Secret } from 'jsonwebtoken';

declare namespace NodeJS {
    export interface ProcessEnv {
        DB_HOST: string;
        DB_PORT: string;
        DB_USERNAME: string;
        DB_PASSWORD: string;
        DB_DATABASE: string;
        JWT_ENCRYPTION_KEY: string;
        JWT_SIGNING_KEY: Secret;
    }
}
