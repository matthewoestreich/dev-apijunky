export default class Configuration {
    public static readonly DB_HOST: string = process.env.DB_HOST || '';

    public static readonly DB_PORT: string = process.env.DB_PORT || '';

    public static readonly DB_USERNAME: string = process.env.DB_USERNAME || '';

    public static readonly DB_PASSWORD: string = process.env.DB_PASSWORD || '';

    public static readonly JWT_ENCRYPTION_KEY: string = process.env.JWT_ENCRYPTION_KEY || '';

    public static readonly JWT_SIGNING_KEY: string = process.env.JWT_SIGNING_KEY || '';

    public static readonly JWT_EXPIRES_IN: string = process.env.JWT_EXPIRES_IN || '1 hour';

    public static readonly DB_DATABASE: string = process.env.DB_DATABASE || '';

    public static toResponseObject = (): object => {
        return {
            DB_HOST: Configuration.DB_HOST,
            DB_PORT: Configuration.DB_PORT,
            DB_DATABASE: Configuration.DB_DATABASE,
            DB_USERNAME: Configuration.DB_USERNAME,
            DB_PASSWORD: Configuration.DB_PASSWORD,
            JWT_ENCRYPTION_KEY: Configuration.JWT_ENCRYPTION_KEY,
            JWT_SIGNING_KEY: Configuration.JWT_SIGNING_KEY,
            JWT_EXPIRES_IN: Configuration.JWT_EXPIRES_IN,
        };
    };
}
