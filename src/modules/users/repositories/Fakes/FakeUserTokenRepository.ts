import UserToken from '@modules/users/infra/typeorm/entities/UserToken';
import IUserTokenRepository from '@modules/users/repositories/IUserTokenRepository';
import { v1 as uuid } from 'uuid';

class FakeUserTokenRepository implements IUserTokenRepository {
  private userToken: UserToken[] = [];

  public async generate(user_id: string): Promise<UserToken | undefined> {
    const userToken = new UserToken();

    Object.assign(userToken, {
      id: uuid(),
      token: uuid(),
      user_id,
      created_at: new Date(),
      update_at: new Date(),
    });

    this.userToken.push(userToken);

    return userToken;
  }

  public async findByToken(token: string): Promise<UserToken | undefined> {
    const userToken = this.userToken.find(
      user_Token => user_Token.token === token,
    );

    return userToken;
  }
}

export default FakeUserTokenRepository;
