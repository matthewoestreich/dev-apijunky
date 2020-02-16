import { JWT } from 'entities';
import { deleteEntity } from 'utils';

export const removeExpiredToken = async (id: number | string): Promise<boolean> => {
    try {
        await deleteEntity(JWT, { where: { id } });
        return true;
    } catch {
        return false;
    }
};
