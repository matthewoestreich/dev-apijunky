import { BaseEntity, Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
class JWT extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('varchar', { unique: true })
    token: string;

    @Column({ type: 'timestamp' })
    expires: Date;
}

export default JWT;
