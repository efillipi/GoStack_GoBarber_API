import { Router } from 'express';
import ensureAuth from '@modules/users/infra/middlewares/ensureAuth';

import AppointmentController from '@modules/appointments/infra/http/controllers/AppointmentController';
import ProviderAppointmentsController from '../controllers/ProviderAppointmentsController';

const AppointmentsRouter = Router();

AppointmentsRouter.use(ensureAuth);
const appointmentController = new AppointmentController();
const providerAppointmentsController = new ProviderAppointmentsController();

AppointmentsRouter.get('/', appointmentController.getall);
AppointmentsRouter.post('/', appointmentController.create);
AppointmentsRouter.get('/me', providerAppointmentsController.index);

export default AppointmentsRouter;
