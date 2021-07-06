import { Request, Response } from 'express';
import { container } from 'tsyringe';
import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';
import { classToClass } from 'class-transformer';

class UserAvatarController {
  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;
    const { filename } = request.file;

    const updateUserAvatarService = container.resolve(UpdateUserAvatarService);

    const updateUserAvatar = await updateUserAvatarService.execute({
      user_id: id,
      avatarFilename: filename,
    });

    return response.json(classToClass(updateUserAvatar));
  }
}

export default UserAvatarController;
