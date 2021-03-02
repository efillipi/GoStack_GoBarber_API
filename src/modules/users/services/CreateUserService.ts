import User from '@modules/users//infra/typeorm/entities/User'
import AppError from '@shared/errors/AppError';
import { hash } from 'bcryptjs'
import IUsersRepository from '../repositories/IUsersRepository';
import { injectable, inject } from 'tsyringe'

interface IRequest {
    name: string
    email: string;
    password: string;
}

@injectable()
class CreateUser {

    constructor(
        @inject('UsersRepositorio')
        private usersRepository: IUsersRepository,
    ) { }

    public async execute({ name, email, password }: IRequest): Promise<User> {

        const emailAlreadyExists = await this.usersRepository.findByEmail(email)

        if (emailAlreadyExists) {
            throw new AppError('Este Email ja esta sendo utilizado', 409)
        }

        const hashPassword = await hash(password, 8)

        const user = await this.usersRepository.create({
            name,
            email,
            password: hashPassword
        })

        return user
    }

}


export default CreateUser;