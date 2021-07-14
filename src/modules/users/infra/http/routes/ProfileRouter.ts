import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuth from '@modules/users/infra/middlewares/ensureAuth';

import ProfileController from '@modules/users/infra/http/controllers/ProfileController';

const ProfileRouter = Router();

const profileController = new ProfileController();

ProfileRouter.use(ensureAuth);
ProfileRouter.put(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string(),
      email: Joi.string().email(),
      old_password: Joi.string(),
      password: Joi.string(),
      password_confirmation: Joi.string().valid(Joi.ref('password')),
    },
  }),
  profileController.update,
);
ProfileRouter.get('/', profileController.show);

export default ProfileRouter;
