import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateUserService from '@modules/users/services/CreateUserService';
import ShowUsersService from '@modules/users/services/ShowUsersService';

class UserController {
  public async show(request: Request, response: Response): Promise<Response> {
    const showUsersService = container.resolve(ShowUsersService);

    const users = await showUsersService.execute();

    return response.status(200).json(users);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;

    const createUserServices = container.resolve(CreateUserService);

    const user = await createUserServices.execute({
      name,
      email,
      password,
    });

    delete user.password;

    return response.status(201).json(user);
  }
}

export default UserController;
