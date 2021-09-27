import { Router } from 'express';
import ensureAuth from '@modules/users/infra/middlewares/ensureAuth';
import { celebrate, Segments, Joi } from 'celebrate';

import AppointmentController from '@modules/appointments/infra/http/controllers/AppointmentController';
import ProviderAppointmentsController from '@modules/appointments/infra/http/controllers/ProviderAppointmentsController';
import RejectionAppointmentController from '@modules/appointments/infra/http/controllers/RejectionAppointmentController';
import ApprovalAppointmentController from '@modules/appointments/infra/http/controllers/ApprovalAppointmentController';
import CancelAppointmentController from '@modules/appointments/infra/http/controllers/CancelAppointmentController';

const AppointmentsRouter = Router();

AppointmentsRouter.use(ensureAuth);
const appointmentController = new AppointmentController();
const providerAppointmentsController = new ProviderAppointmentsController();
const rejectionAppointmentController = new RejectionAppointmentController();
const approvalAppointmentController = new ApprovalAppointmentController();
const cancelAppointmentController = new CancelAppointmentController();

AppointmentsRouter.get('/', appointmentController.getall);

AppointmentsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      provider_id: Joi.string().uuid().required(),
      dateAppointment: Joi.date().required(),
    },
  }),
  appointmentController.create,
);
AppointmentsRouter.get('/me', providerAppointmentsController.index);

AppointmentsRouter.post(
  '/:id/rejection',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  rejectionAppointmentController.index,
);

AppointmentsRouter.post(
  '/:id/approval',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  approvalAppointmentController.index,
);

AppointmentsRouter.post(
  '/:id/cancel',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  cancelAppointmentController.index,
);

export default AppointmentsRouter;
