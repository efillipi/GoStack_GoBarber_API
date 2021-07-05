import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider';

class FakeHashProvider implements IHashProvider {
  public async generateHash(payload: string): Promise<string> {
    return payload;
  }

  public async comparreHash(payload: string, hashed: string): Promise<boolean> {
    const hashPassword = payload === hashed;

    return hashPassword;
  }
}
export default FakeHashProvider;
