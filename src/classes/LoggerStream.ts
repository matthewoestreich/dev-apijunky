import { Logger } from 'winston';

export default class LoggerStream {
    public WinstonLogger: Logger;

    constructor(winstonLogger: Logger) {
        this.WinstonLogger = winstonLogger;
    }

    write = (message: string): void => {
        const jsonMessage = JSON.parse(message);
        this.WinstonLogger.info(jsonMessage);
        // this.WinstonLogger.info(message.substring(0, message.lastIndexOf('\n')));
    };
}
