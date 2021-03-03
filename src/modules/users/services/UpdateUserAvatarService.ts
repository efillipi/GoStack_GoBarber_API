import AppError from '@shared/errors/AppError';
import User from '@modules/users/infra/typeorm/entities/User'
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IStorageProvider from '@shared/Container/providers/StorageProvider/models/IStorageProvider';
import { injectable, inject } from 'tsyringe'

interface IRequest {
  user_id: string
  avatarFilename: string;
}

@injectable()
class UpdateUserAvatarService {

  constructor(

    @inject('UsersRepositorio')
    private usersRepository: IUsersRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,

  ) { }

  public async execute({ user_id, avatarFilename }: IRequest): Promise<User> {

    const user = await this.usersRepository.findById(user_id)

    if (!user) {
      throw new AppError('apenas usuários autênticos mudam de avatar', 401)
    }

    if (user.avatar) {

      this.storageProvider.deleteFile(user.avatar)
    }

    const filename = await this.storageProvider.saveFile(avatarFilename)

    user.avatar = filename

    await this.usersRepository.save(user)

    delete user.password

    return user;
  }

}


export default UpdateUserAvatarService;
