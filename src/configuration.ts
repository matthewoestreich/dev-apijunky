class EnvConfiguration {
    /*
    public static readonly DB_HOST: string = process.env.DB_HOST || '';

    public static readonly DB_PORT: string = process.env.DB_PORT || '';

    public static readonly DB_USERNAME: string = process.env.DB_USERNAME || '';

    public static readonly DB_PASSWORD: string = process.env.DB_PASSWORD || '';

    public static readonly JWT_ENCRYPTION_KEY: string = process.env.JWT_ENCRYPTION_KEY || '';

    public static readonly JWT_SIGNING_KEY: string = process.env.JWT_SIGNING_KEY || '';

    public static readonly JWT_EXPIRES_IN: string = process.env.JWT_EXPIRES_IN || '1 hour';

    public static readonly DB_DATABASE: string = process.env.DB_DATABASE || '';
    */
    [key: string]: string;

    constructor() {
        /*
        const exclude = [
            'TERM_PROGRAM',
            'NODE',
            'INIT_CWD',
            'SHELL',
            'TERM',
            'TMPDIR',
            'TERM_PROGRAM_VERSION',
            'USER',
            'SSH_AUTH_SOCK',
            '__CF_USER_TEXT_ENCODING',
            'PATH',
            'PWD',
            'LANG',
            'XPC_FLAGS',
            'XPC_SERVICE_NAME',
            'HOME',
            'SHLVL',
            'LOGNAME',
            'COLORTERM',
            '_',
        ];
        */
        const { env } = process;
        const envKeys = Object.keys(env);

        envKeys.forEach(ek => {
            this[ek] = env[ek] || '';
        });
    }
}

const Configuration = new EnvConfiguration();
export default Configuration;
