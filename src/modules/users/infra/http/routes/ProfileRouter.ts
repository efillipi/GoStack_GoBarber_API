import { Router } from 'express';
import ensureAuth from '@modules/users/infra/middlewares/ensureAuth';

import ProfileController from '@modules/users/infra/http/controllers/ProfileController';

const ProfileRouter = Router();

const profileController = new ProfileController();

ProfileRouter.use(ensureAuth);
ProfileRouter.put('/', profileController.update);
ProfileRouter.get('/', profileController.show);

export default ProfileRouter;
