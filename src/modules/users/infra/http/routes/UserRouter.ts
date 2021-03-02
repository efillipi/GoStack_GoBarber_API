import { Router } from 'express';
import ensureAuth from '@modules/users/infra/middlewares/ensureAuth'
import multer from 'multer'
import uploadConfig from '@config/upload'

const UserRouter = Router();

import UserController from '../controllers/UserController'
const userController = new UserController();

const upload = multer(uploadConfig);

UserRouter.get('/', userController.getall)
UserRouter.post('/', userController.create)
UserRouter.patch('/avatar', ensureAuth, upload.single('avatar'), userController.avatar)


export default UserRouter;