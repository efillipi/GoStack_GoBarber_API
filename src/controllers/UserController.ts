import { Request, Response } from 'express'
import UsersRepositorio from '../respositorios/UsersRepositorio'
import CreateUserService from '../services/CreateUserService'
import { getCustomRepository } from 'typeorm'


class UserController {

    async getall(request: Request, response: Response) {

        const usersRepositorio = getCustomRepository(UsersRepositorio)
        const users = await usersRepositorio.find()

        return response.status(200).json(users)
    }

    async create(request: Request, response: Response) {

        const {
            name,
            email,
            password,
        } = request.body;

        const createUserServices = new CreateUserService()

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