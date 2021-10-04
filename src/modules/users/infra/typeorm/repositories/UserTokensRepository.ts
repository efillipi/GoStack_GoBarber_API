import UserToken from '@modules/users/infra/typeorm/entities/UserToken';
import IUserTokenRepository from '@modules/users/repositories/IUserTokenRepository';
import randomNumbers from '@shared/utils/randomNumbers';
import { getRepository, Repository } from 'typeorm';

class UserTokensRepositorio implements IUserTokenRepository {
  private ormRepository: Repository<UserToken>;

  constructor() {
    this.ormRepository = getRepository(UserToken);
  }

  public async generate(user_id: string): Promise<UserToken> {
    const token = await this.generateValidToken();
    const userToken = this.ormRepository.create({
      user_id,
      token,
    });

    await this.ormRepository.save(userToken);

    return userToken;
  }

  public async findByToken(token: string): Promise<UserToken | undefined> {
    const userToken = await this.ormRepository.findOne({
      where: { token },
    });

    return userToken;
  }

  private async generateValidToken(): Promise<string> {
    const token = randomNumbers();

    const existToken = await this.ormRepository.findOne({
      where: { token },
    });

    if (existToken) {
      this.generateValidToken();
    }

    return token;
  }
}

export default UserTokensRepositorio;
