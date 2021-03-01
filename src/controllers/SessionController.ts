import { Request, Response } from 'express'
import AuthUserService from '@modules/users/services/AuthUserService'
import UsersRepositorio from '@modules/users/infra/typeorm/repositories/UsersRepositorio'



class SessionController {

    async create(request: Request, response: Response) {

        const usersRepositorio = new UsersRepositorio()

        const {
            email,
            password
        } = request.body

        const authUserService = new AuthUserService(usersRepositorio)

        const { token, user } = await authUserService.execute({
            email,
            password
        })

        return response.status(200).json({ token, user })

    }

}





export default SessionController;