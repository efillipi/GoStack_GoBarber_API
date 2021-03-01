import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm'
import User from '@modules/users/infra/typeorm/entities/User'

@Entity('appointments')
class Appointment {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    provider_id: string;

    @ManyToOne(()=> User)
    @JoinColumn({name: 'provider_id'})
    provider: User;

    
    @Column()
    dateAppointment: Date;

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    update_at: Date

}

export default Appointment;
