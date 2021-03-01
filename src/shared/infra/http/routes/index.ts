import {Router} from 'express'
const routes = Router();

import AppointmentsRouter from '@modules/appointments/infra/http/routes/AppointmentsRouter'
import UserRouter from '@modules/users/infra/http/routes/UserRouter'
import SessionRouter from '@modules/users/infra/http/routes/SessionRouter'



routes.use('/appointments',AppointmentsRouter);
routes.use('/users',UserRouter);
routes.use('/sessions',SessionRouter);

export default routes