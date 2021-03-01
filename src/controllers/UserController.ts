import { Request, Response } from 'express'
import UsersRepositorio from '@modules/users/infra/typeorm/repositories/UsersRepositorio'
import CreateUserService from '@modules/users/services/CreateUserService'
import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService'

class UserController {

    async getall(request: Request, response: Response) {
        const usersRepositorio = new UsersRepositorio()

        const users = await usersRepositorio.find()

        return response.status(200).json(users)
    }

    async create(request: Request, response: Response) {

        const usersRepositorio = new UsersRepositorio()

        const {
            name,
            email,
            password,
        } = request.body;

        const createUserServices = new CreateUserService(usersRepositorio)

        const user = await createUserServices.execute({
            name,
            email,
            password
        })

        delete user.password;

        return response.status(201).json(user)

    }

    async avatar(request: Request, response: Response) {

        const usersRepositorio = new UsersRepositorio()


        const { id } = request.user

        const { filename } = request.file

        const updateUserAvatarService = new UpdateUserAvatarService(usersRepositorio)

        const updateUserAvatar = await updateUserAvatarService.execute({
            user_id: id,
            avatarFilename: filename
        })

        return response.status(200).json(updateUserAvatar)

    }

}







export default UserController;