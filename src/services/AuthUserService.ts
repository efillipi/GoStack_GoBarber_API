import User from '../models/User'
import UsersRepositorio from '../respositorios/UsersRepositorio'
import { getRepository } from 'typeorm'
import AppError from '../errors/AppError';
import { compare, compareSync } from 'bcryptjs'
import { sign } from 'jsonwebtoken'
import authConfig from '../config/auth'


interface Request {
    email: string;
    password: string
}

interface Response {
    user: User;
    token: string
}

class AuthUserService {

    public async execute({ email, password }: Request): Promise<Response> {

        const { secret, expiresIn } = authConfig.jtw

        const usersRepositorio = getRepository(User);

        const user = await usersRepositorio.findOne({
            where: { email }
        })

        if (!user) {
            throw new AppError('Falha na Autenticação', 401)
        }

        const matchPassword = await compare(password, user.password);

        if (!matchPassword) {
            throw new AppError('Falha na Autenticação', 401)
        }

        delete user.password



        const token = sign(
            {

            },
            secret,
            {
                subject: user.id,
                expiresIn,

            }
        );

        return {
            user,
            token
        }
    }

}


export default AuthUserService;