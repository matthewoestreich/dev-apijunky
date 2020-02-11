import {
    BaseEntity,
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';

import is from 'utils/validation';

@Entity()
class User extends BaseEntity {
    static validations = {
        name: [is.required(), is.maxLength(100)],
        email: [is.required(), is.email(), is.maxLength(200)],
    };

    @PrimaryGeneratedColumn()
    id: number;

    @Column('varchar')
    name: string;

    @Column('varchar')
    email: string;

    @Column('varchar', { length: 2000 })
    avatarUrl: string;

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date;
}

export default User;
