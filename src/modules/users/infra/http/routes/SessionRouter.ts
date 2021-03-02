import { Router } from 'express';

const SessionRouter = Router();

import SessionController from '../controllers/SessionController'
const sessionController = new SessionController();

SessionRouter.post('/', sessionController.create)

export default SessionRouter;