import { Router } from 'express';

const PasswordRouter = Router();

import ForgotPasswordController from '@modules/users/infra/http/controllers/ForgotPasswordController'
const forgotPasswordController = new ForgotPasswordController();

import ResetPasswordController from '@modules/users/infra/http/controllers/ResetPasswordController'
const resetPasswordController = new ResetPasswordController();

PasswordRouter.post('/reset', resetPasswordController.create)
PasswordRouter.post('/forgot', forgotPasswordController.create)

export default PasswordRouter;