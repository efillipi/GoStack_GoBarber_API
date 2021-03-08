import { Router } from 'express';
import ensureAuth from '@modules/users/infra/middlewares/ensureAuth'

const ProfileRouter = Router();

import ProfileController from '@modules/users/infra/http/controllers/ProfileController'

const profileController = new ProfileController();

ProfileRouter.use(ensureAuth)
ProfileRouter.put('/', profileController.update)
ProfileRouter.get('/', profileController.show)

export default ProfileRouter;
