import AppError from '@shared/errors/AppError';
import User from '@modules/users/infra/typeorm/entities/User';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider';
import { injectable, inject } from 'tsyringe';
import ICacheProvider from '@shared/Container/providers/CacheProvider/models/ICacheProvider';

interface IRequest {
  user_id: string;
  name: string;
  email: string;
  old_password?: string;
  password?: string;
}

@injectable()
class UpdateProfileService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    user_id,
    name,
    email,
    old_password,
    password,
  }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('usuário inexistente', 404);
    }

    const userWithUpdateEmail = await this.usersRepository.findByEmail(email);

    if (userWithUpdateEmail && userWithUpdateEmail.id !== user_id) {
      throw new AppError('Email informado em uso', 409);
    }

    if (password && !old_password) {
      throw new AppError('Senha antiga não informada');
    }

    if (password && old_password) {
      const user_password = await this.hashProvider.comparreHash(
        old_password,
        user.password,
      );

      if (!user_password) {
        throw new AppError(
          'Operação não Autozirada, senha anterior informada incorreta',
          401,
        );
      }
      user.password = await this.hashProvider.generateHash(password);
    }

    user.name = name;
    user.email = email;

    this.usersRepository.save(user);

    await this.cacheProvider.invalidatePrefix('providers-list');

    return user;
  }
}

export default UpdateProfileService;
