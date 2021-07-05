import { Router } from 'express';
import ensureAuth from '@modules/users/infra/middlewares/ensureAuth';

import ProvidersController from '@modules/appointments/infra/http/controllers/ProvidersController';

const ProvidersRouter = Router();

ProvidersRouter.use(ensureAuth);
const providersController = new ProvidersController();

ProvidersRouter.get('/', providersController.index);

export default ProvidersRouter;
