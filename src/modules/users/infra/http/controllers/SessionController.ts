import { Request, Response } from 'express';
import { container } from 'tsyringe';
import AuthUserService from '@modules/users/services/AuthUserService';
import { classToClass } from 'class-transformer';

class SessionController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const authUserService = container.resolve(AuthUserService);

    const { token, user } = await authUserService.execute({
      email,
      password,
    });

    return response.json({ user: classToClass(user), token });
  }
}

export default SessionController;
