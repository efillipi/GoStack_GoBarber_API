import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm'
import User from './User'

@Entity('agendamentos')
class Agendamento {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    provider_id: string;

    @ManyToOne(()=> User)
    @JoinColumn({name: 'provider_id'})
    provider: User;

    
    @Column()
    dataAgendamento: Date;

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    update_at: Date

}

export default Agendamento;

