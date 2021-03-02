import { Request, Response } from 'express'
import { container } from 'tsyringe'
import AuthUserService from '@modules/users/services/AuthUserService'

class SessionController {

    async create(request: Request, response: Response) {

        const {
            email,
            password
        } = request.body

        const authUserService = container.resolve(AuthUserService)

        const { token, user } = await authUserService.execute({
            email,
            password
        })

        return response.status(200).json({ token, user })

    }

}





export default SessionController;