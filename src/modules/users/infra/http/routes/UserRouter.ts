import { Router } from 'express';
import ensureAuth from '@modules/users/infra/middlewares/ensureAuth';
import multer from 'multer';
import uploadConfig from '@config/upload';
import { celebrate, Segments, Joi } from 'celebrate';

import UserController from '@modules/users/infra/http/controllers/UserController';
import UserAvatarController from '@modules/users/infra/http/controllers/UserAvatarController';

const UserRouter = Router();

const userController = new UserController();
const userAvatarController = new UserAvatarController();

const upload = multer(uploadConfig.multer);

UserRouter.get('/', userController.show);

UserRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      role: Joi.string().optional(),
    },
  }),
  userController.create,
);

UserRouter.patch(
  '/avatar',
  ensureAuth,
  upload.single('avatar'),
  userAvatarController.update,
);

export default UserRouter;
