import { Entity, PrimaryGeneratedColumn, Column,CreateDateColumn, UpdateDateColumn, Generated } from 'typeorm'

@Entity('User_token')
class UserToken {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    @Generated('uuid')
    token: string;

    @Column()
    user_id: string;

    @CreateDateColumn()
    created_at : Date

    @UpdateDateColumn()
    update_at: Date

}

export default UserToken;

