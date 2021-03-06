import { Router } from 'express';

const SessionRouter = Router();

import SessionController from '@modules/users/infra/http/controllers/SessionController'
const sessionController = new SessionController();

SessionRouter.post('/', sessionController.create)

export default SessionRouter;
