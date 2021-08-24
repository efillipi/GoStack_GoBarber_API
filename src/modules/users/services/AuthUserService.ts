import User from '@modules/users/infra/typeorm/entities/User';
import AppError from '@shared/errors/AppError';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider';
import IAuthProvider from '@modules/users/providers/AuthProvider/models/IAuthProvider';
import { injectable, inject } from 'tsyringe';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: User;
  token: string;
}

@injectable()
class AuthUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,

    @inject('AuthProvider')
    private authProvider: IAuthProvider,
  ) {}

  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Falha na Autenticação', 401);
    }

    const matchPassword = await this.hashProvider.comparreHash(
      password,
      user.password,
    );

    if (!matchPassword) {
      throw new AppError('Falha na Autenticação', 401);
    }

    const token = await this.authProvider.sing(user);

    return {
      user,
      token,
    };
  }
}

export default AuthUserService;
