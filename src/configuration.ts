import { InvalidEnvironmentalConfiguration } from 'errors';

/* eslint-disable lines-between-class-members */
class EnvironmentalConfiguration {
    readonly NODE_ENV: string = process.env.NODE_ENV || 'development';
    readonly HOST_PORT: string = process.env.HOST_PORT || '3000';
    readonly DB_HOST: string = process.env.DB_HOST || 'localhost';
    readonly DB_PORT: string = process.env.DB_PORT || '5432';
    readonly DB_USERNAME: string = process.env.DB_USERNAME || 'admin';
    readonly DB_PASSWORD: string = process.env.DB_PASSWORD || 'admin';
    readonly DB_DATABASE: string = process.env.DB_DATABASE || 'test';
    readonly JWT_EXPIRES_IN: string = process.env.JWT_EXPIRES_IN || '10 minutes'; // <-- uses ms.js notation
    readonly JWT_ENCRYPTION_KEY: string = process.env.JWT_ENCRYPTION_KEY;
    readonly JWT_SIGNING_KEY: string = process.env.JWT_SIGNING_KEY;

    init = (): EnvironmentalConfiguration => {
        const config = new EnvironmentalConfiguration();
        const missing = [];
        if (config.JWT_ENCRYPTION_KEY === undefined) missing.push('JWT_ENCRYPTION_KEY');
        if (config.JWT_SIGNING_KEY === undefined) missing.push('JWT_SIGNING_KEY');
        if (missing.length) throw new InvalidEnvironmentalConfiguration({ missing });
        return config;
    };
}
/* eslint-disable lines-between-class-members */

const Configuration = new EnvironmentalConfiguration();
export default Configuration;
