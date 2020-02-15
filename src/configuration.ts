export default class Configuration {
    public static readonly DB_HOST: string = process.env.DB_HOST || '';

    public static readonly DB_PORT: string = process.env.DB_PORT || '';

    public static readonly DB_USERNAME: string = process.env.DB_USERNAME || '';

    public static readonly DB_PASSWORD: string = process.env.DB_PASSWORD || '';

    public static readonly JWT_ENCRYPTION_KEY: string = process.env.JWT_ENCRYPTION_KEY || '';

    public static readonly JWT_SIGNING_KEY: string = process.env.JWT_SIGNING_KEY || '';

    public static readonly JWT_EXPIRES_IN: string = process.env.JWT_EXPIRES_IN || '';

    public static readonly DB_DATABASE: string = process.env.DB_DATABASE || '';
}
