import {
    BaseEntity,
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    BeforeInsert,
    OneToOne,
    JoinColumn,
} from 'typeorm';

import bcrypt from 'bcrypt';

import { JWT } from 'database/entities';

@Entity()
class User extends BaseEntity {
    constructor(username?: string, password?: string) {
        super();
        if (username) {
            this.username = username;
        }
        if (password) {
            this.password = password;
        }
    }

    @PrimaryGeneratedColumn()
    id: number;

    @Column('varchar', { unique: true })
    username: string;

    @Column('varchar')
    password: string;

    @CreateDateColumn({ type: 'timestamp', nullable: true })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp', nullable: true })
    updatedAt: Date;

    @OneToOne(
        _ => JWT,
        jwt => jwt.user,
        { cascade: true, eager: true, onDelete: 'SET NULL' },
    )
    @JoinColumn()
    jwt: JWT;

    @BeforeInsert()
    hashPassword = (): void => {
        const salt = bcrypt.genSaltSync(11);
        this.password = bcrypt.hashSync(this.password, salt);
    };

    validatePassword = (password: string): boolean => {
        return bcrypt.compareSync(password, this.password);
    };

    toResponseObject = (): object => {
        return {
            id: this.id,
            username: this.username,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
        };
    };
}

export default User;
