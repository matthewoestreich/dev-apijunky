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

@Entity()
class User extends BaseEntity {
    validateHash = (suppliedPassword: string): boolean => {
        return bcrypt.compareSync(suppliedPassword, this.password);
    };

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

    @BeforeInsert()
    hashPassword = (): void => {
        const salt = bcrypt.genSaltSync(11);
        this.password = bcrypt.hashSync(this.password, salt);
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
