import AppError from '@shared/errors/AppError';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IUserTokenRepository from '@modules/users/repositories/IUserTokenRepository';
import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider';
import { isAfter, addHours } from 'date-fns';
import { injectable, inject } from 'tsyringe';

interface IRequest {
  token: string;
  password: string;
}

@injectable()
class ResetPasswordService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('UserTokensRepository')
    private userTokenRepository: IUserTokenRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({ token, password }: IRequest): Promise<void> {
    const userToken = await this.userTokenRepository.findByToken(token);

    if (!userToken) {
      throw new AppError('token do usuário invalido');
    }

    const user = await this.usersRepository.findById(userToken.user_id);

    if (!user) {
      throw new AppError('usuário invalido');
    }

    const tokenCreated_at = userToken.created_at;
    const compareDate = addHours(tokenCreated_at, 2);

    if (isAfter(Date.now(), compareDate)) {
      throw new AppError('token expirado');
    }

    user.password = await this.hashProvider.generateHash(password);

    await this.usersRepository.save(user);
  }
}

export default ResetPasswordService;
