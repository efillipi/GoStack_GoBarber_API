import { Router } from 'express';
import ensureAuth from '@modules/users/infra/middlewares/ensureAuth';

import ProvidersController from '@modules/appointments/infra/http/controllers/ProvidersController';
import ProviderMonthAvailabilityController from '../controllers/ProviderMonthAvailabilityController';
import ProviderDayAvailabilityController from '../controllers/ProviderDayAvailabilityController';

const ProvidersRouter = Router();

ProvidersRouter.use(ensureAuth);
const providersController = new ProvidersController();
const providerMonthAvailabilityController = new ProviderMonthAvailabilityController();
const providerDayAvailabilityController = new ProviderDayAvailabilityController();

ProvidersRouter.get('/', providersController.index);

ProvidersRouter.get(
  '/:provider_id/month-availability',
  providerMonthAvailabilityController.index,
);
ProvidersRouter.get(
  '/:provider_id/day-availability',
  providerDayAvailabilityController.index,
);

export default ProvidersRouter;
