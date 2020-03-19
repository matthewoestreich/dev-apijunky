import redis from 'redis';
import { User } from 'database/entities';

const client = redis.createClient();

export const saveUser = (token: string, user: User): Promise<void> => {
    const finalUser = JSON.stringify(user.toJSON());
    return new Promise((resolve, reject) => {
        try {
            client.set(token, finalUser, err => {
                if (err) {
                    reject(err);
                }
                resolve();
            });
        } catch (err) {
            reject(err);
        }
    });
};

export const getUser = (token: string): Promise<object> => {
    return new Promise((resolve, reject) => {
        try {
            client.get(token, (err, data) => {
                if (err) {
                    reject(err);
                }
                resolve(JSON.parse(data));
            });
        } catch (error) {
            reject(error);
        }
    });
};
