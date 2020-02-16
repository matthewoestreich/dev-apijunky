/* eslint-disable no-dupe-class-members */
import { FindOneOptions } from 'typeorm/find-options/FindOneOptions';

import { User, JWT } from 'entities';
import { EntityNotFoundError } from 'errors';
// import { TokenExpiredError } from 'jsonwebtoken';
// import { generateErrors } from 'utils/validation';

type EntityConstructor = typeof User | typeof JWT;
type EntityInstance = User | JWT;

// const entities: { [key: string]: EntityConstructor } = { User, JWT };

export const findEntity = async <T extends EntityConstructor>(
    Constructor: T,
    options?: FindOneOptions,
): Promise<InstanceType<T>> => {
    const entity = await Constructor.findOne(options);
    return entity;
};

export const findEntityOrThrow = async <T extends EntityConstructor>(
    Constructor: T,
    options?: FindOneOptions,
): Promise<InstanceType<T>> => {
    const instance = await findEntity(Constructor, options);
    if (!instance) {
        throw new EntityNotFoundError(Constructor.name);
    }
    return instance;
};

export const createEntity = async <T extends EntityConstructor>(
    Constructor: T,
    input: Partial<InstanceType<T>>,
): Promise<InstanceType<T>> => {
    const instance = Constructor.create(input);
    return instance.save() as Promise<InstanceType<T>>;
};

export const deleteEntity = async <T extends EntityConstructor>(
    Constructor: T,
    options: FindOneOptions,
): Promise<InstanceType<T>> => {
    const instance = await findEntityOrThrow(Constructor, options);
    await instance.remove();
    return instance;
};

/*
export const updateEntity = async <T extends EntityConstructor>(
    Constructor: T,
    id: number | string,
    input: Partial<InstanceType<T>>,
): Promise<InstanceType<T>> => {
    const instance = await findEntityOrThrow(Constructor, id);
    Object.assign(instance, input);
    return instance.save() as Promise<InstanceType<T>>;
};
*/

/*
export const validateAndSaveEntity = async <T extends EntityInstance>(instance: T): Promise<T> => {
    const Constructor = entities[instance.constructor.name];

    if ('validations' in Constructor) {
        const errorFields = generateErrors(instance, Constructor.validations);

        if (Object.keys(errorFields).length > 0) {
            throw new BadUserInputError({ fields: errorFields });
        }
    }
    return instance.save() as Promise<T>;
};
*/
