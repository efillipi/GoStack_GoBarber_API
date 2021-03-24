import { Router } from 'express';
import ensureAuth from '@modules/users/infra/middlewares/ensureAuth'

const ProvidersRouter = Router();

ProvidersRouter.use(ensureAuth)

import ProvidersController from '@modules/appointments/infra/http/controllers/ProvidersController'
const providersController = new ProvidersController();

ProvidersRouter.get('/', providersController.index)


export default ProvidersRouter;
