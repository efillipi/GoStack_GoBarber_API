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

        try {
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
        } catch (err) {
            return response.status(err.statusCode).json({ error: err.message })

        }
    }
    async avatar(request: Request, response: Response) {

        try {
            const { id } = request.user

            const { filename } = request.file

            const updateUserAvatarService = new UpdateUserAvatarService()

            const updateUserAvatar = await updateUserAvatarService.execute({
                user_id: id,
                avatarFilename: filename
            })

            return response.status(200).json(updateUserAvatar)
        } catch (err) {
            return response.status(err.statusCode).json({ error: err.message })

        }
    }

}







export default UserController;