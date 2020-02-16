import { CustomError } from 'errors/customErrors';

export class InvalidEnvironmentalConfiguration extends CustomError {
    constructor(data: {}) {
        super('Invalid Enviornmental Configuration detected!', 'INVALID_ENV_CONFIG', 500, data);
    }
}
