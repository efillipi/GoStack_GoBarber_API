import User from '@modules/users//infra/typeorm/entities/User'
import UsersRepositorio from '@modules/users/infra/typeorm/repositories/UsersRepositorio'
import AppError from '@shared/errors/AppError';
import { hash } from 'bcryptjs'
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
    name: string
    email: string;
    password: string;
}

class CreateUser {

    constructor(private usersRepository: IUsersRepository) { }

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