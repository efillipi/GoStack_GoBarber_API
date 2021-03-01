import User from '@modules/users/infra/typeorm/entities/User'
import AppError from '@shared/errors/AppError';
import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'
import authConfig from '@config/auth'
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
    email: string;
    password: string
}

interface IResponse {
    user: User;
    token: string
}

class AuthUserService {

    constructor(private usersRepository: IUsersRepository) { }

    public async execute({ email, password }: IRequest): Promise<IResponse> {

        const { secret, expiresIn } = authConfig.jtw

        const user = await this.usersRepository.findByEmail(email)

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