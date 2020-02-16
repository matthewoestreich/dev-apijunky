import { StringMap } from 'objects';

class EnvConfiguration extends StringMap {
    constructor() {
        super();
        Object.keys(process.env).forEach(k => {
            this[k] = process.env[k] || '';
        });
    }
}

const Configuration = new EnvConfiguration();
export default Configuration;
