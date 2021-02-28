import { Router } from 'express';

const UserRouter = Router();

import UserController from '../controllers/UserController'
const userController = new UserController();

UserRouter.get('/', userController.getall)
UserRouter.post('/', userController.create)


export default UserRouter;