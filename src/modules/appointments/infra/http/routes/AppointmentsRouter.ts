import { Router } from 'express';
import ensureAuth from '@modules/users/infra/middlewares/ensureAuth';

import AppointmentController from '@modules/appointments/infra/http/controllers/AppointmentController';

const AppointmentsRouter = Router();

AppointmentsRouter.use(ensureAuth);
const appointmentController = new AppointmentController();

AppointmentsRouter.get('/', appointmentController.getall);
AppointmentsRouter.post('/', appointmentController.create);

export default AppointmentsRouter;
