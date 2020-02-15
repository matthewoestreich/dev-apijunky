import { StringMap } from 'objects';

class EnvConfiguration extends StringMap {
    constructor() {
        super();
        const { env } = process;
        const envKeys = Object.keys(env);
        envKeys.forEach(ek => {
            this[ek] = env[ek] || '';
        });
    }
}

const Configuration = new EnvConfiguration();
export default Configuration;
