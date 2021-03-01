import { Request, Response } from 'express'
import { startOfHour, parseISO } from 'date-fns';
import AgendatmentoRepositorio from '../respositorios/AgendatmentosRepositorio'
import CriarAgendamentoService from '../services/CriarAgendamentoService'
import { getCustomRepository } from 'typeorm'

class AgendamentoController {

    async getall(request: Request, response: Response) {

        try {
            const agendatmentosRepositorio = getCustomRepository(AgendatmentoRepositorio)
            const agendamentos = await agendatmentosRepositorio.find()

            return response.status(200).json(agendamentos)
        } catch (err) {

            return response.status(err.statusCode).json({ error: err.message })

        }
    }

    async create(request: Request, response: Response) {

        try {
            const {
                provider_id,
                dataAgendamento,
            } = request.body;

            const parseData = startOfHour(parseISO(dataAgendamento))

            const criarAgendamentoServices = new CriarAgendamentoService()

            const agendamento = await criarAgendamentoServices.execute({
                provider_id,
                dataAgendamento: parseData
            })

            return response.status(201).json(agendamento)
        } catch (err) {
            return response.status(err.statusCode).json({ error: err.message })

        }


    }

}



export default AgendamentoController;