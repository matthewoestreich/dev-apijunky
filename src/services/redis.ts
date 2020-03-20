/*
import redis from 'redis';

const client = redis.createClient();

export const saveUser = (token: string, expire?: number): Promise<boolean> => {
    return new Promise((resolve, reject) => {
        try {
            client.set(token, 'true', (errorSet, dataSet) => {
                if (errorSet) {
                    reject(errorSet);
                }
                if (expire) {
                    client.expire(token, expire, errorExpire => {
                        if (errorExpire) {
                            reject(errorExpire);
                        }
                        resolve(true);
                    });
                }
                resolve(dataSet === 'OK');
            });
        } catch (err) {
            reject(err);
        }
    });
};

export const getUser = (token: string): Promise<string> => {
    return new Promise((resolve, reject) => {
        try {
            client.get(token, (err, data) => {
                if (err) {
                    reject(err);
                }
                resolve(data);
            });
        } catch (error) {
            reject(error);
        }
    });
};

export const deleteItem = (key: string): Promise<boolean> => {
    return new Promise((resolve, reject) => {
        client.del(key, (err, data) => {
            if (err) {
                reject(err);
            }
            resolve(typeof data === 'number');
        });
    });
};
*/
