import Agendamento from '../models/Agendamento'
import { EntityRepository, Repository } from 'typeorm'
import UsersRepositorio from './UsersRepositorio'
import User from '../models/User'

@EntityRepository(Agendamento)
class AgendatmentosReositorio extends Repository<Agendamento> {

    public async verificarHoraAgendamento(dataAgendamento: Date): Promise<Agendamento | null> {

        const verificarHoraAgendamento = await this.findOne({
            where: { dataAgendamento } 
        })

        return verificarHoraAgendamento || null
    }
}


export default AgendatmentosReositorio