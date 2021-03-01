import { getRepository } from 'typeorm'
import path from 'path'


import fs from 'fs'
import AppError from '../errors/AppError';
import User from '../models/User'
import uploadConfig from '../config/upload'


interface Request {
    user_id: string
    avatarFilename: string;
}

class UpdateUserAvatarService {

    public async execute({ user_id, avatarFilename }: Request): Promise<User> {

        const usersRepositorio = getRepository(User)

        const user = await usersRepositorio.findOne(user_id)

        if (!user) {
            throw new AppError('apenas usuários autênticos mudam de avatar')
        }

        if (user.avatar) {
            const userAvatarFilePatch = path.join(uploadConfig.directory, user.avatar)
            const userAvatarFileExists = await fs.promises.stat(userAvatarFilePatch)

            if (userAvatarFileExists) {
                await fs.promises.unlink(userAvatarFilePatch)
            }
        }
        user.avatar = avatarFilename

        await usersRepositorio.save(user)

        delete user.password

        return user;
    }

}


export default UpdateUserAvatarService;