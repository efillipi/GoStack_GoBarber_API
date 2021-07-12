import FakeUserRepository from '@modules/users/repositories/Fakes/FakeUserRepository';
import ListProviderService from '@modules/appointments/services/ListProviderService';
import CreateUserService from '@modules/users/services/CreateUserService';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import FakeCacheProvider from '@shared/Container/providers/CacheProvider/fakes/FakeCacheProvider';

let fakeHashProvider: FakeHashProvider;
let createUserService: CreateUserService;

let listProviderService: ListProviderService;
let fakeUserRepository: FakeUserRepository;
let fakeCacheProvider: FakeCacheProvider;

describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    fakeHashProvider = new FakeHashProvider();
    fakeCacheProvider = new FakeCacheProvider();
    createUserService = new CreateUserService(
      fakeUserRepository,
      fakeHashProvider,
      fakeCacheProvider,
    );

    listProviderService = new ListProviderService(
      fakeUserRepository,
      fakeCacheProvider,
    );
  });

  it('should be able to find all t', async () => {
    const user1 = await createUserService.execute({
      email: 'use1r@example.com',
      name: 'User Example',
      password: '123456',
    });

    const user2 = await createUserService.execute({
      email: 'user2@example.com',
      name: 'User Example',
      password: '123456',
    });

    const user3 = await createUserService.execute({
      email: 'user3@example.com',
      name: 'User Example',
      password: '123456',
    });

    const listProvider = await listProviderService.execute({
      user_id: user3.id,
    });

    expect(listProvider).toEqual([user1, user2]);
  });
});
