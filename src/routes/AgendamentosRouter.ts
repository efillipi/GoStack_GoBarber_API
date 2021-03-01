import { Router } from 'express';
import ensureAuth  from '../middlewares/ensureAuth'

const AgendamentosRouter = Router();

AgendamentosRouter.use(ensureAuth)


import AgendamentoController from '../controllers/AgendamentoController'
const agendamentoController = new AgendamentoController();

AgendamentosRouter.get('/', agendamentoController.getall)
AgendamentosRouter.post('/', agendamentoController.create)


export default AgendamentosRouter;