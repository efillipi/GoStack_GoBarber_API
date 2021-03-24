import FakeAppointmentsRepository from '@modules/appointments/repositories/Fakes/FakeAppointmentRepository';
import FakeUserRepository from '@modules/users/repositories/Fakes/FakeUserRepository';
import CreateAppointmentService from '@modules/appointments/services/NewAppointmentService';
import ListProviderService from '@modules/appointments/services/ListProviderService';
import CreateUserService from '@modules/users/services/CreateUserService'
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider'


let fakeHashProvider: FakeHashProvider
let createUserService: CreateUserService
let fakeAppointmentsRepository: FakeAppointmentsRepository
let createAppointmentService: CreateAppointmentService
let listProviderService: ListProviderService
let fakeUserRepository: FakeUserRepository


describe('CreateAppointment', () => {

  beforeEach(() => {

    fakeUserRepository = new FakeUserRepository();
    fakeHashProvider = new FakeHashProvider();
    createUserService = new CreateUserService(fakeUserRepository, fakeHashProvider);

    fakeAppointmentsRepository = new FakeAppointmentsRepository()
    createAppointmentService = new CreateAppointmentService(fakeAppointmentsRepository)
    listProviderService = new ListProviderService(fakeUserRepository)

  })

  it('should be able to find all t', async () => {

    const user1 = await createUserService.execute({
      email: 'use1r@example.com',
      name: 'User Example',
      password: '123456'
    });

    const user2 = await createUserService.execute({
      email: 'user2@example.com',
      name: 'User Example',
      password: '123456'
    });

    const user3 = await createUserService.execute({
      email: 'user3@example.com',
      name: 'User Example',
      password: '123456'
    });


    const listProvider = await listProviderService.execute({
      user_id: user3.id
    })



    expect(listProvider).toEqual([
      user1,
      user2
    ]);
  });


});
