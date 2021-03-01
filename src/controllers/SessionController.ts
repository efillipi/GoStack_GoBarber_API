import { Request, Response } from 'express'

import UsersRepositorio from '../respositorios/UsersRepositorio'
import AuthUserService from '../services/AuthUserService'
import { getCustomRepository } from 'typeorm'
import AppError from '../errors/AppError';

class SessionController {

    async create(request: Request, response: Response) {

        try {
            const {
                email,
                password
            } = request.body

            const authUserService = new AuthUserService()

            const { token, user } = await authUserService.execute({
                email,
                password
            })

            return response.status(200).json({ token, user })
        } catch (err) {
            return response.status(err.statusCode).json({ error: err.message })

        }
    }

}





export default SessionController;