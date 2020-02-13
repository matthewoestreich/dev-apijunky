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
    validatePassword = (suppliedPassword: string): boolean => {
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
}

export default User;
