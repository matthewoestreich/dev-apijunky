import { InvalidEnvironmentalConfiguration } from 'errors';

/* eslint-disable lines-between-class-members */
class EnvironmentalConfiguration {
    readonly NODE_ENV: string = process.env.NODE_ENV || 'development';
    readonly HOST_PORT: string = process.env.HOST_PORT || '3000';
    readonly DB_HOST: string = process.env.DB_HOST || 'localhost';
    readonly DB_PORT: string = process.env.DB_PORT || '5432';
    readonly DB_USERNAME: string = process.env.DB_USERNAME || 'apijunky';
    readonly DB_PASSWORD: string = process.env.DB_PASSWORD || '@piJunky123';
    readonly DB_DATABASE: string = process.env.DB_DATABASE || 'devapijunky';
    readonly JWT_EXPIRES_IN: string = process.env.JWT_EXPIRES_IN || '10 minutes'; // <-- uses ms.js notation
    readonly JWT_ENCRYPTION_KEY: string = process.env.JWT_ENCRYPTION_KEY || '';
    readonly JWT_SIGNING_KEY: string = process.env.JWT_SIGNING_KEY || '';

    init = (): EnvironmentalConfiguration => {
        const config = new EnvironmentalConfiguration();
        const missing = [];
        if (config.JWT_ENCRYPTION_KEY === '') missing.push('JWT_ENCRYPTION_KEY');
        if (config.JWT_SIGNING_KEY === '') missing.push('JWT_SIGNING_KEY');
        if (missing.length) throw new InvalidEnvironmentalConfiguration({ missing });
        return config;
    };
}
/* eslint-disable lines-between-class-members */

const Configuration = new EnvironmentalConfiguration();
export default Configuration;
