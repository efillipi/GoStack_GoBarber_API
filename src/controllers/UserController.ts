import { Request, Response } from 'express'
import UsersRepositorio from '../respositorios/UsersRepositorio'
import CreateUserService from '../services/CreateUserService'
import UpdateUserAvatarService from '../services/UpdateUserAvatarService'
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
    async avatar(request: Request, response: Response) {

        const { id } = request.user

        console.log(request.file)

        const { filename } = request.file

        const updateUserAvatarService = new UpdateUserAvatarService()

        const updateUserAvatar = await updateUserAvatarService.execute({
            user_id: id,
            avatarFilename: filename
        })

        return response.status(200).json(updateUserAvatar)
    }

}



export default UserController;