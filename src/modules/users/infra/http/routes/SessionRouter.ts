import { Router } from 'express';

import SessionController from '@modules/users/infra/http/controllers/SessionController';

const SessionRouter = Router();
const sessionController = new SessionController();

SessionRouter.post('/', sessionController.create);

export default SessionRouter;
