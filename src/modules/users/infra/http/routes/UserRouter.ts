import { Router } from 'express';
import ensureAuth from '@modules/users/infra/middlewares/ensureAuth'
import multer from 'multer'
import uploadConfig from '@config/upload'

const UserRouter = Router();

import UserController from '../controllers/UserController'
import UserAvatarController from '../controllers/UserAvatarController'

const userController = new UserController();
const userAvatarController = new UserAvatarController();

const upload = multer(uploadConfig);

UserRouter.get('/', userController.getall)
UserRouter.post('/', userController.create)
UserRouter.patch('/avatar', ensureAuth, upload.single('avatar'), userAvatarController.update)

export default UserRouter;