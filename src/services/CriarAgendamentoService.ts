import Agendamento from '../models/Agendamento'
import AgendatmentosRepositorio from '../respositorios/AgendatmentosRepositorio'
import { getCustomRepository } from 'typeorm'
import AppError from '../errors/AppError';


interface Request {
    provider_id: string
    dataAgendamento: Date;
}

class CriarAgendamentoService {

    public async execute({ provider_id, dataAgendamento, }: Request): Promise<Agendamento> {

        const agendatmentosRepositorio = getCustomRepository(AgendatmentosRepositorio);

        // const userAlreadyExists = await agendatmentosRepositorio.userAlreadyExists(
        //     provider_id
        // )
        
        // if (userAlreadyExists) {
        //     throw new AppError('Este Usuario não existe')
        // }

        const verificarHoraAgendamento = await agendatmentosRepositorio.verificarHoraAgendamento(
            dataAgendamento
        )

        if (verificarHoraAgendamento) {
            throw new AppError('Este Horario já está agendado')
        }

        const agendamento = agendatmentosRepositorio.create({
            provider_id,
            dataAgendamento
        })

        await agendatmentosRepositorio.save(agendamento)

        return agendamento
    }

}


export default CriarAgendamentoService;