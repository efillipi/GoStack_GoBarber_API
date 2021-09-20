import FakeUserRepository from '@modules/users/repositories/Fakes/FakeUserRepository';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import FakeJWTAuthProvider from '@modules/users/providers/AuthProvider/fakes/FakeJWTAuthProvider';
import AuthUserService from '@modules/users/services/AuthUserService';
import CreateUserService from '@modules/users/services/CreateUserService';
import FakeCacheProvider from '@shared/Container/providers/CacheProvider/fakes/FakeCacheProvider';

import AppError from '@shared/errors/AppError';

let fakeCacheProvider: FakeCacheProvider;

let fakeUserRepository: FakeUserRepository;
let fakeHashProvider: FakeHashProvider;
let fakeJWTAuthProvider: FakeJWTAuthProvider;
let authUserService: AuthUserService;
let createUserService: CreateUserService;

describe('AuthUserService', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    fakeHashProvider = new FakeHashProvider();
    fakeJWTAuthProvider = new FakeJWTAuthProvider();
    fakeCacheProvider = new FakeCacheProvider();

    authUserService = new AuthUserService(
      fakeUserRepository,
      fakeHashProvider,
      fakeJWTAuthProvider,
    );
    createUserService = new CreateUserService(
      fakeUserRepository,
      fakeHashProvider,
      fakeCacheProvider,
    );
  });

  it('must be able to log in to the application', async () => {
    await createUserService.execute({
      email: 'user@example.com',
      name: 'User Example',
      role: 'user',
      password: '123456',
    });

    const user = await authUserService.execute({
      email: 'user@example.com',
      password: '123456',
    });

    expect(user).toHaveProperty('token');
  });

  it('should not be able to log in with invalid password', async () => {
    const new_user = await createUserService.execute({
      email: 'user@example.com',
      name: 'User Example',
      role: 'user',
      password: '123456',
    });

    await expect(
      authUserService.execute({
        email: new_user.email,
        password: '12345',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to log in with invalid email', async () => {
    await expect(
      authUserService.execute({
        email: 'user_invalid@example.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
