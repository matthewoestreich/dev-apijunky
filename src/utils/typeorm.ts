import { FindOneOptions } from 'typeorm/find-options/FindOneOptions';

import { User, JWT } from 'entities';
import { EntityNotFoundError } from 'errors';
// import { generateErrors } from 'utils/validation';

type EntityConstructor = typeof User | typeof JWT;
type EntityInstance = User | JWT;

// const entities: { [key: string]: EntityConstructor } = { User, JWT };

export const findEntityOrThrow = async <T extends EntityConstructor>(
    Constructor: T,
    options?: FindOneOptions,
): Promise<InstanceType<T>> => {
    const instance = await Constructor.findOne(options);
    if (!instance) {
        throw new EntityNotFoundError(Constructor.name);
    }
    return instance;
};

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

export const createEntity = async <T extends EntityConstructor>(
    Constructor: T,
    input: Partial<InstanceType<T>>,
): Promise<InstanceType<T>> => {
    const instance = Constructor.create(input) as InstanceType<T>;
    return instance.save() as Promise<InstanceType<T>>;
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
export const deleteEntity = async <T extends EntityConstructor>(
    Constructor: T,
    id: number | string,
): Promise<InstanceType<T>> => {
    const instance = await findEntityOrThrow(Constructor, id);
    await instance.remove();
    return instance;
};
*/
