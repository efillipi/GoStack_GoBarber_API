import { Request, Response } from 'express'
import { container } from 'tsyringe'
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository'
import CreateUserService from '@modules/users/services/CreateUserService'

class UserController {

  public async getall(request: Request, response: Response): Promise<Response> {
    const usersRepository = new UsersRepository()

    const users = await usersRepository.find()

    return response.status(200).json(users)
  }

  public async create(request: Request, response: Response): Promise<Response> {

    const {
      name,
      email,
      password,
    } = request.body;

    const createUserServices = container.resolve(CreateUserService)

    const user = await createUserServices.execute({
      name,
      email,
      password
    })

    delete user.password;

    return response.status(201).json(user)

  }
}

export default UserController;
