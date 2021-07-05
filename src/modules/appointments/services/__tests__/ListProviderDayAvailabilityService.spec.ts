import FakeAppointmentsRepository from '@modules/appointments/repositories/Fakes/FakeAppointmentRepository';
import FakeUserRepository from '@modules/users/repositories/Fakes/FakeUserRepository';
import CreateAppointmentService from '@modules/appointments/services/NewAppointmentService';
import CreateUserService from '@modules/users/services/CreateUserService';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import ListProviderDayAvailabilityService from '@modules/appointments/services/ListProviderDayAvailabilityService';

let fakeHashProvider: FakeHashProvider;
let createUserService: CreateUserService;
let fakeAppointmentsRepository: FakeAppointmentsRepository;
let createAppointmentService: CreateAppointmentService;
let fakeUserRepository: FakeUserRepository;
let listProviderDayAvailabilityService: ListProviderDayAvailabilityService;

describe('ListProviderMonthAvailability', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    fakeHashProvider = new FakeHashProvider();
    createUserService = new CreateUserService(
      fakeUserRepository,
      fakeHashProvider,
    );

    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    createAppointmentService = new CreateAppointmentService(
      fakeAppointmentsRepository,
    );

    listProviderDayAvailabilityService = new ListProviderDayAvailabilityService(
      fakeAppointmentsRepository,
    );
  });

  it('should be able to create a new appointment', async () => {
    const user = await createUserService.execute({
      email: 'user@example.com',
      name: 'User Example',
      password: '123456',
    });

    await createAppointmentService.execute({
      dateAppointment: new Date(2021, 4, 19, 14, 0, 0),
      provider_id: user.id,
    });

    await createAppointmentService.execute({
      dateAppointment: new Date(2021, 4, 19, 15, 0, 0),
      provider_id: user.id,
    });

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2021, 4, 19, 11).getTime();
    });

    const listProviderMonthAvailability = await listProviderDayAvailabilityService.execute(
      {
        provider_id: user.id,
        day: 19,
        month: 5,
        year: 2021,
      },
    );

    expect(listProviderMonthAvailability).toEqual(
      expect.arrayContaining([
        { hour: 8, available: false },
        { hour: 9, available: false },
        { hour: 10, available: false },
        { hour: 11, available: false },
        { hour: 13, available: true },
        { hour: 14, available: false },
        { hour: 15, available: false },
        { hour: 16, available: true },
      ]),
    );
  });
});
