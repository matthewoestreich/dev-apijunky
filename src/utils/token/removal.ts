import { LessThan } from 'typeorm';
import { cyan, magenta, green } from 'chalk';

import { JWT } from 'entities';
import { deleteEntity, DateExtended } from 'utils';

const { log } = console;

export const removeTokenById = async (id: number | string): Promise<boolean> => {
    try {
        await deleteEntity(JWT, { where: { id } });
        return true;
    } catch {
        return false;
    }
};

export const findExpiredTokens = async (): Promise<JWT[]> => {
    const expiredTokens = await JWT.find({
        where: {
            expires: LessThan(new Date(Date.now())),
        },
    });
    return expiredTokens;
};

export const autoRemoveExpiredTokens = (checkEveryMins: number): ReturnType<typeof setInterval> => {
    return setInterval(() => {
        let expiredTokens: JWT[];
        const timestamp = DateExtended.nowToFriendlyDateTime();

        (async (): Promise<void> => {
            expiredTokens = await findExpiredTokens();
            log(magenta(`\r\n${'*'.repeat(80)}`));
            if (expiredTokens.length) {
                log(`${magenta(timestamp)}: ${cyan('Removing the following tokens:')}`);
                log(expiredTokens);
                await JWT.remove(expiredTokens);
                log(green('Done removing tokens!'));
            } else {
                log(magenta(`${cyan(timestamp)}: No expired tokens found!`));
            }
            log(magenta(`${'*'.repeat(80)}\r\n`));
        })();
    }, 1000 * 60 * checkEveryMins).unref();
};
