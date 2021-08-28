import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateUserService from '@modules/users/services/CreateUserService';
import ShowUsersService from '@modules/users/services/ShowUsersService';
import { classToClass } from 'class-transformer';

class UserController {
  public async show(request: Request, response: Response): Promise<Response> {
    const showUsersService = container.resolve(ShowUsersService);

    const users = await showUsersService.execute();

    return response.json(classToClass(users));
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password, role } = request.body;

    const createUserServices = container.resolve(CreateUserService);

    const user = await createUserServices.execute({
      name,
      email,
      password,
      role,
    });

    return response.json(classToClass(user));
  }
}

export default UserController;
