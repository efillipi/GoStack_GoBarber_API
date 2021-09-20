import FakeUserRepository from '@modules/users/repositories/Fakes/FakeUserRepository';
import CreateUserService from '@modules/users/services/CreateUserService';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import FakeCacheProvider from '@shared/Container/providers/CacheProvider/fakes/FakeCacheProvider';
import AppError from '@shared/errors/AppError';

let fakeUserRepository: FakeUserRepository;
let fakeHashProvider: FakeHashProvider;
let createUserService: CreateUserService;
let fakeCacheProvider: FakeCacheProvider;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    fakeHashProvider = new FakeHashProvider();
    fakeCacheProvider = new FakeCacheProvider();
    createUserService = new CreateUserService(
      fakeUserRepository,
      fakeHashProvider,
      fakeCacheProvider,
    );
  });

  it('should be able to create a new User', async () => {
    const user = await createUserService.execute({
      email: 'user@example.com',
      name: 'User Example',
      password: '123456',
      role: 'User',
    });

    expect(user).toHaveProperty('id');
    expect(user.email).toBe('user@example.com');
    expect(user.name).toBe('User Example');
  });

  it('should not be able to create a new user with the same email', async () => {
    await createUserService.execute({
      email: 'user@example.com',
      name: 'User Example',
      password: '123456',
      role: 'User',
    });

    await expect(
      createUserService.execute({
        email: 'user@example.com',
        name: 'User Example',
        password: '123456',
        role: 'User',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Show users', async () => {
    await createUserService.execute({
      email: 'user@example.com',
      name: 'User Example',
      password: '123456',
      role: 'User',
    });

    const users = await fakeUserRepository.find();

    expect(users.length).toBe(1);
  });
});
