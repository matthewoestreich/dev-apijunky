declare namespace Express {
    export interface Response {
        respond: (status: number, data: object | string) => void;
    }
    export interface Request {
        bodyParametersExist: (expectedParameters: string[]) => boolean;

        user: import('database/entities/User').default | null;

        __reqId: string;

        rawJwt: string | null;
    }
}
