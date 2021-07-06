import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import SessionController from '@modules/users/infra/http/controllers/SessionController';

const SessionRouter = Router();
const sessionController = new SessionController();

SessionRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  sessionController.create,
);

export default SessionRouter;
