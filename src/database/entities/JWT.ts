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

    @Column({ type: 'timestamp' })
    expires: Date;

    @OneToOne(
        _ => User,
        user => user.jwt,
    )
    user: User | null;

    // decrypt = (): null => {
    //     return null;
    // };
}

export default JWT;
