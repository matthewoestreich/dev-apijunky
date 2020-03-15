import { BaseEntity, Entity, Column, PrimaryGeneratedColumn, OneToOne } from 'typeorm';

import { User } from 'database/entities';

@Entity()
class JWT extends BaseEntity {
    constructor(token?: string, expires?: Date, user?: User) {
        super();
        if (user) {
            this.user = user;
        }
        if (token) {
            this.token = token;
        }
        if (expires) {
            this.expires = expires;
        }
    }

    @PrimaryGeneratedColumn()
    id: number;

    @Column('varchar', { unique: true })
    token: string;

    // Using 'timestamp with time zone' below is extremely important!
    //
    // TLDR; Even though postgres does not store the actual offset along
    // with the data in the database, it will calculate the offset
    // at the time of the query (which I hate).
    //
    // For example, our database server is in heroku, in a different
    // timezone than the environment I am using to test.  If I saved
    // a token from the test environment, while the "prod" environment
    // was running (using same db/tables/etc..), the prod environment
    // would read the token expiration as the current time but in it's
    // timezone.
    //
    // If I saved something while in the Central time zone, it would
    // be displayed as:
    //  - In postgres: 2020-03-15 18:09:46
    //  - In dev JS (central): Sun Mar 15 2020 18:09:46 GMT-0500 (Central Daylight Time)
    //  - In prod JS (utc): Sun Mar 15 2020 18:09:46 GMT+0000 (Coordinated Universal Time)
    // As you can see, prod is not respecting time zone (when just
    // using `{ type: 'timestamp' }` ).
    //
    // After switching to 'timestamp with time zone' this was no longer
    // an issue.
    @Column({ type: 'timestamp with time zone' })
    expires: Date;

    @OneToOne(
        _ => User,
        user => user.jwt,
        { nullable: true },
    )
    user: User | null;

    // decrypt = (): null => {
    //     return null;
    // };
}

export default JWT;
