import User from '@modules/users//infra/typeorm/entities/User'
import AppError from '@shared/errors/AppError';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider'
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

        @inject('HashProvider')
        private hashProvider : IHashProvider,
    ) { }

    public async execute({ name, email, password }: IRequest): Promise<User> {

        const emailAlreadyExists = await this.usersRepository.findByEmail(email)

        if (emailAlreadyExists) {
            throw new AppError('Este Email ja esta sendo utilizado', 409)
        }

        const hashPassword = await this.hashProvider.generateHash(password)

        const user = await this.usersRepository.create({
            name,
            email,
            password: hashPassword
        })

        return user
    }

}


export default CreateUser;
