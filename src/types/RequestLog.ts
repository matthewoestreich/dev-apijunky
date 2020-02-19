import { IncomingHttpHeaders } from 'http';

export type RequestLog = {
    [key: string]: string | IncomingHttpHeaders | object;
};
