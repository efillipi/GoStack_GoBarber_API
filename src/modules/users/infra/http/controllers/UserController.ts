import { Request, Response } from 'express'
import { container } from 'tsyringe'
import UsersRepositorio from '@modules/users/infra/typeorm/repositories/UsersRepositorio'
import CreateUserService from '@modules/users/services/CreateUserService'
import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService'



class UserController {

    public async getall(request: Request, response: Response): Promise<Response> {
        const usersRepositorio = new UsersRepositorio()

        const users = await usersRepositorio.find()

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