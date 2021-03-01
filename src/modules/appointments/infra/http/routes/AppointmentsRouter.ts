import { Router } from 'express';
import ensureAuth  from '@modules/users/infra/middlewares/ensureAuth'

const AppointmentsRouter = Router();

AppointmentsRouter.use(ensureAuth)


import AppointmentController from '../../../../../controllers/AppointmentController'
const appointmentController = new AppointmentController();

AppointmentsRouter.get('/', appointmentController.getall)
AppointmentsRouter.post('/', appointmentController.create)


export default AppointmentsRouter;