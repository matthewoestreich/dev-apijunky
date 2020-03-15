import { LessThan } from 'typeorm';
import { cyan, magenta, green, red, yellow } from 'chalk';
import ms from 'ms';

import { JWT } from 'database/entities';
import DateExtended from 'classes/DateExtended';

const { log, trace } = console;

const findExpiredTokens = async (): Promise<JWT[]> => {
    const expiredTokens = await JWT.find({
        where: {
            expires: LessThan(new Date(Date.now())),
        },
    });
    return expiredTokens;
};

const timeNow = (): string => DateExtended.nowToFriendlyDateTime();

export const autoRemoveExpiredTokens = (every: string): ReturnType<typeof setInterval> => {
    return setInterval(() => {
        const tryRemoveExpiredTokens = async (): Promise<void> => {
            log(magenta(`${cyan(timeNow())}: Checking for expired tokens...`));
            const expiredTokens = await findExpiredTokens();
            if (expiredTokens.length) {
                try {
                    log(`${magenta(timeNow())}: ${cyan('Removing the following tokens:')}`);
                    log(expiredTokens);
                    await JWT.remove(expiredTokens);
                } catch (error) {
                    trace(yellow(error));
                    log();
                    log(red(error));
                }
                const expiredTokensRecheck = await findExpiredTokens();
                if (!expiredTokensRecheck.length) {
                    log(green('Done removing tokens!'));
                } else {
                    log(red('Failed to remove expired tokens!'));
                }
            } else {
                log(magenta(`${cyan(timeNow())}: No expired tokens found!`));
            }
        };

        (async (): Promise<void> => {
            log(magenta(`\r\n${'*'.repeat(80)}`));
            await tryRemoveExpiredTokens();
            log(magenta(`${'*'.repeat(80)}\r\n`));
        })();
    }, ms(every)).unref();
};
