import {Router} from 'express'
const routes = Router();

import AgendamentosRouter from './AgendamentosRouter'
import UserRouter from './UserRouter'
import SessionRouter from './SessionRouter'



routes.use('/agendamentos',AgendamentosRouter);
routes.use('/users',UserRouter);
routes.use('/sessions',SessionRouter);

export default routes