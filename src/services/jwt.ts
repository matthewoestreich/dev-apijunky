import { LessThan } from 'typeorm';
import { cyan, magenta, green, red, yellow, blueBright, keyword, Chalk } from 'chalk';
import ms from 'ms';

import { JWT } from 'database/entities';
import DateExtended from 'classes/DateExtended';

const { log, trace } = console;
const orange = keyword('orange');

const logStars = (newLineFrontOrBack: 'front' | 'back', count: number, color: Chalk): void => {
    const msg = color('*'.repeat(count));
    // eslint-disable-next-line default-case
    switch (newLineFrontOrBack) {
        case 'front':
            return log(`\r\n${msg}`);
        case 'back':
            return log(`${msg}\r\n`);
        default:
            // eslint-disable-next-line consistent-return, no-useless-return
            return;
    }
};

const findExpiredTokens = async (dateLessThan: Date): Promise<JWT[]> => {
    const expiredTokens = await JWT.find({
        where: {
            expires: LessThan(dateLessThan),
        },
    });
    return expiredTokens;
};

const friendlyTime = (): string => DateExtended.nowToFriendlyDateTime();

export const autoRemoveExpiredTokensEvery = (interval: string): ReturnType<typeof setInterval> => {
    return setInterval(() => {
        const tryRemoveExpiredTokens = async (): Promise<void> => {
            log(magenta(`${cyan(friendlyTime())}: Checking for expired tokens...`));
            const searchDate = new Date(Date.now());

            const expiredTokens = await findExpiredTokens(searchDate);

            if (expiredTokens.length) {
                try {
                    log(`${magenta(friendlyTime())}: ${cyan('Removing the following tokens:')}`);
                    log(expiredTokens);

                    logStars('front', 80, blueBright);
                    log(green.bold('\t\tEXPIRED TOKEN INFO'));
                    expiredTokens.forEach((t, i) => {
                        log(`\t ${green(`Token ${i} expires:`)}  ${orange(t.expires)}`);
                    });
                    logStars('back', 80, blueBright);

                    await JWT.remove(expiredTokens);
                } catch (error) {
                    trace(yellow(error));
                    log();
                    log(red(error));
                }

                const expiredTokensRecheck = await findExpiredTokens(searchDate);
                if (expiredTokensRecheck.length) {
                    log(red(`Failed to remove expired tokens!:\r\n${expiredTokensRecheck}`));
                } else {
                    log(green('Done removing tokens!'));
                }
            } else {
                log(magenta(`${cyan(friendlyTime())}: No expired tokens found!`));
            }
        };

        (async (): Promise<void> => {
            logStars('front', 80, magenta);
            await tryRemoveExpiredTokens();
            logStars('back', 80, magenta);
        })();
    }, ms(interval)).unref();
};
