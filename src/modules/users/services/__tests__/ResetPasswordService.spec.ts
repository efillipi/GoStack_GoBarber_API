import FakeUserRepository from '@modules/users/repositories/Fakes/FakeUserRepository';
import FakeUserTokenRepository from '@modules/users/repositories/Fakes/FakeUserTokenRepository';
import ResetPasswordService from '@modules/users/services/ResetPasswordService';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';

import AppError from '@shared/errors/AppError';

let fakeUserRepository: FakeUserRepository;
let fakeUserTokenRepository: FakeUserTokenRepository;
let resetPasswordService: ResetPasswordService;
let fakeHashProvider: FakeHashProvider;

describe('ResetPasswordService', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    fakeUserTokenRepository = new FakeUserTokenRepository();
    fakeHashProvider = new FakeHashProvider();

    resetPasswordService = new ResetPasswordService(
      fakeUserRepository,
      fakeUserTokenRepository,
      fakeHashProvider,
    );
  });

  it('sould be able to reset the password', async () => {
    const generateHash = jest.spyOn(fakeHashProvider, 'generateHash');

    const user = await fakeUserRepository.create({
      email: 'user@example.com',
      name: 'User Example',
      password: '123456',
      role: 'User',
    });

    const userToken = await fakeUserTokenRepository.generate(user.id);

    await resetPasswordService.execute({
      token: userToken.token,
      password: '1234567',
    });

    const updtaeUser = await fakeUserRepository.findById(user.id);

    expect(updtaeUser.password).toBe('1234567');
    expect(generateHash).toHaveBeenCalledWith('1234567');
  });

  it('should not be able to reset the password, an invalid token', async () => {
    await expect(
      resetPasswordService.execute({
        token: 'yeriwuyroeirbejwlre8924bnkv923ljkdjlksfhsfd',
        password: '1234567',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to reset the password, which does not exist', async () => {
    const userToken = await fakeUserTokenRepository.generate('error');

    await expect(
      resetPasswordService.execute({
        token: userToken.token,
        password: '1234567',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to reset the password if passed more than 2 hours', async () => {
    const user = await fakeUserRepository.create({
      email: 'user@example.com',
      name: 'User Example',
      password: '123456',
      role: 'User',
    });

    const userToken = await fakeUserTokenRepository.generate(user.id);

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      const custumDate = new Date();
      return custumDate.setHours(custumDate.getHours() + 3);
    });

    await expect(
      resetPasswordService.execute({
        token: userToken.token,
        password: '1234567',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
