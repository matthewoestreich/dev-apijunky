declare namespace Express {
    export interface Response {
        respond: (status: number, data: object | string) => void;
    }
    export interface Request {
        currentUser: import('entities').User;
        __reqId: string;
    }
}
