import FakeUserRepository from '@modules/users/repositories/Fakes/FakeUserRepository';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import CreateUserService from '@modules/users/services/CreateUserService';
import ShowUsersService from '@modules/users/services/ShowUsersService';
import FakeCacheProvider from '@shared/Container/providers/CacheProvider/fakes/FakeCacheProvider';

import AppError from '@shared/errors/AppError';

let fakeUserRepository: FakeUserRepository;
let fakeHashProvider: FakeHashProvider;
let createUserService: CreateUserService;
let showUsersService: ShowUsersService;
let fakeCacheProvider: FakeCacheProvider;

describe('ShowUsersService', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    fakeHashProvider = new FakeHashProvider();
    fakeCacheProvider = new FakeCacheProvider();

    createUserService = new CreateUserService(
      fakeUserRepository,
      fakeHashProvider,
      fakeCacheProvider,
    );
    showUsersService = new ShowUsersService(fakeUserRepository);
  });

  it('must return all users', async () => {
    await createUserService.execute({
      email: 'user@example.com',
      name: 'User Example',
      password: '123456',
    });

    const user_show = await showUsersService.execute();

    expect(user_show.length).toBe(1);
  });

  it('should not return all users', async () => {
    expect(showUsersService.execute()).rejects.toBeInstanceOf(AppError);
  });
});
