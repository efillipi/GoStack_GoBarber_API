import {Router} from 'express'
const routes = Router();

import AppointmentsRouter from '@modules/appointments/infra/http/routes/AppointmentsRouter'
import UserRouter from '@modules/users/infra/http/routes/UserRouter'
import SessionRouter from '@modules/users/infra/http/routes/SessionRouter'
import PasswordRouter from '@modules/users/infra/http/routes/PasswordRouter'
import ProfileRouter from '@modules/users/infra/http/routes/ProfileRouter'

routes.use('/appointments',AppointmentsRouter);
routes.use('/users',UserRouter);
routes.use('/sessions',SessionRouter);
routes.use('/password',PasswordRouter);
routes.use('/profile',ProfileRouter);

export default routes
