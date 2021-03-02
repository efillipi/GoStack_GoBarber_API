import FakeUserRepository from '@modules/users/repositories/Fakes/FakeUserRepository'
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider'
import AuthUserService from '@modules/users/services/AuthUserService';
import CreateUserService from '@modules/users/services/CreateUserService'

import AppError from '@shared/errors/AppError';

describe('AuthUserService', () => {

  it('must be able to log in to the application', async () => {
    const fakeUserRepository = new FakeUserRepository();
    const fakeHashProvider = new FakeHashProvider();
    const authUserService = new AuthUserService(fakeUserRepository,fakeHashProvider);
    const createUserService = new CreateUserService(fakeUserRepository, fakeHashProvider);

    await createUserService.execute({
      email: "user@example.com",
      name: "User Example",
      password: "123456"
    });

    const user = await authUserService.execute({
      email: "user@example.com",
      password: "123456"
    });

    expect(user).toHaveProperty('token')
  });


  it('should not be able to log in with invalid password', async () => {
    const fakeUserRepository = new FakeUserRepository();
    const fakeHashProvider = new FakeHashProvider();
    const authUserService = new AuthUserService(
      fakeUserRepository,fakeHashProvider
    );
    const createUserService = new CreateUserService(
      fakeUserRepository,fakeHashProvider
    );

    const new_user = await createUserService.execute({
      email: "user@example.com",
      name: "User Example",
      password: "123456"
    });

    expect(
      authUserService.execute({
        email: new_user.email,
        password: "12345"
      })
    ).rejects.toBeInstanceOf(AppError);
  });


  it('should not be able to log in with invalid email', async () => {
    const fakeUserRepository = new FakeUserRepository();
    const fakeHashProvider = new FakeHashProvider();
    const authUserService = new AuthUserService(
      fakeUserRepository,fakeHashProvider
    );
    const createUserService = new CreateUserService(
      fakeUserRepository,fakeHashProvider
    );

    await createUserService.execute({
      email: "user@example.com",
      name: "User Example",
      password: "123456"
    });

    expect(
      authUserService.execute({
        email: "user_invalid@example.com",
        password: "123456"
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
