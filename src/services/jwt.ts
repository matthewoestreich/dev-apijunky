import { LessThan } from 'typeorm';
import { cyan, magenta, green, red, yellow, blueBright, keyword, Chalk } from 'chalk';
import ms from 'ms';

import { JWT } from 'database/entities';
import DateExtended from 'classes/DateExtended';

const { log, trace } = console;
const orange = keyword('orange');

const findExpiredTokens = async (dateLessThan: Date): Promise<JWT[]> => {
    const expiredTokens = await JWT.find({
        where: {
            expires: LessThan(dateLessThan),
        },
    });
    return expiredTokens;
};

const timeNow = (): string => DateExtended.nowToFriendlyDateTime();

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

export const autoRemoveExpiredTokensEvery = (interval: string): ReturnType<typeof setInterval> => {
    return setInterval(() => {
        const tryRemoveExpiredTokens = async (): Promise<void> => {
            log(magenta(`${cyan(timeNow())}: Checking for expired tokens...`));

            const searchDate = new Date(Date.now());
            log(
                blueBright('  ~ Searching for dates less than:'),
                yellow.bold(searchDate),
                blueBright('~  '),
            );

            const expiredTokens = await findExpiredTokens(searchDate);

            if (expiredTokens.length) {
                try {
                    log(`${magenta(timeNow())}: ${cyan('Removing the following tokens:')}`);
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
            // log(magenta(`\r\n${'*'.repeat(80)}`));
            logStars('front', 80, magenta);
            await tryRemoveExpiredTokens();
            logStars('back', 80, magenta);
            // log(magenta(`${'*'.repeat(80)}\r\n`));
        })();
    }, ms(interval)).unref();
};
