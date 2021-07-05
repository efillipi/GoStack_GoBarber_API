import { Router } from 'express';

import ForgotPasswordController from '@modules/users/infra/http/controllers/ForgotPasswordController';

import ResetPasswordController from '@modules/users/infra/http/controllers/ResetPasswordController';

const PasswordRouter = Router();
const forgotPasswordController = new ForgotPasswordController();
const resetPasswordController = new ResetPasswordController();

PasswordRouter.post('/reset', resetPasswordController.create);
PasswordRouter.post('/forgot', forgotPasswordController.create);

export default PasswordRouter;
