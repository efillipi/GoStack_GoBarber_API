import { Router } from 'express';

const AgendamentosRouter = Router();

import AgendamentoController from '../controllers/AgendamentoController'
const agendamentoController = new AgendamentoController();

AgendamentosRouter.get('/', agendamentoController.getall)
AgendamentosRouter.post('/', agendamentoController.create)


export default AgendamentosRouter;