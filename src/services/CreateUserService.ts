import User from '../models/User'
import UsersRepositorio from '../respositorios/UsersRepositorio'
import { getCustomRepository } from 'typeorm'
import AppError from '../errors/AppError';
import {hash} from 'bcryptjs'

interface Request {
    name: string
    email: string;
    password: string;
}

class CreateUser {

    public async execute({ name, email, password }: Request): Promise<User> {

        const usersRepositorio = getCustomRepository(UsersRepositorio);

        const emailAlreadyExists = await usersRepositorio.findOne({
            where: { email }
        })

        if (emailAlreadyExists) {
            throw new AppError('Este Email ja esta sendo utilizado', 409)
        }


        const hashPassword = await hash(password, 8)

        const user = usersRepositorio.create({
            name,
            email,
            password : hashPassword
        })

        await usersRepositorio.save(user)

        return user
    }

}


export default CreateUser;