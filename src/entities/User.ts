import {
    BaseEntity,
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    BeforeInsert,
} from 'typeorm';

import bcrypt from 'bcrypt';

import is from 'utils/validation';

@Entity()
class User extends BaseEntity {
    static validations = {
        name: [is.required(), is.maxLength(100)],
        email: [is.required(), is.email(), is.maxLength(200)],
    };

    validatePassword = (suppliedPassword: string): boolean => {
        return bcrypt.compareSync(suppliedPassword, this.password);
    };

    @PrimaryGeneratedColumn()
    id: number;

    @Column('varchar')
    username: string;

    @Column('varchar')
    password: string;

    @Column('varchar', { unique: true })
    email: string;

    @Column('varchar', { length: 2000, nullable: true })
    avatarUrl: string;

    @CreateDateColumn({ type: 'timestamp', nullable: true })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp', nullable: true })
    updatedAt: Date;

    @BeforeInsert()
    hashPassword = (): void => {
        const salt = bcrypt.genSaltSync(11);
        this.password = bcrypt.hashSync(this.password, salt);
    };
}

export default User;
