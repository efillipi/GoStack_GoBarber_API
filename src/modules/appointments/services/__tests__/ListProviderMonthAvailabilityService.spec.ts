import FakeAppointmentsRepository from '@modules/appointments/repositories/Fakes/FakeAppointmentRepository';
import FakeUserRepository from '@modules/users/repositories/Fakes/FakeUserRepository';
import CreateAppointmentService from '@modules/appointments/services/NewAppointmentService';
import CreateUserService from '@modules/users/services/CreateUserService';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import ListProviderMonthAvailabilityService from '@modules/appointments/services/ListProviderMonthAvailabilityService';

let fakeHashProvider: FakeHashProvider;
let createUserService: CreateUserService;
let fakeAppointmentsRepository: FakeAppointmentsRepository;
let createAppointmentService: CreateAppointmentService;
let fakeUserRepository: FakeUserRepository;
let listProviderMonthAvailabilityService: ListProviderMonthAvailabilityService;

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

    listProviderMonthAvailabilityService = new ListProviderMonthAvailabilityService(
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
      dateAppointment: new Date(2021, 4, 23, 8, 0, 0),
      provider_id: user.id,
      user_id: user.id,
    });
    await createAppointmentService.execute({
      dateAppointment: new Date(2021, 4, 23, 9, 0, 0),
      provider_id: user.id,
      user_id: user.id,
    });

    await createAppointmentService.execute({
      dateAppointment: new Date(2021, 4, 23, 10, 0, 0),
      provider_id: user.id,
      user_id: user.id,
    });

    await createAppointmentService.execute({
      dateAppointment: new Date(2021, 4, 23, 11, 0, 0),
      provider_id: user.id,
      user_id: user.id,
    });

    await createAppointmentService.execute({
      dateAppointment: new Date(2021, 4, 23, 12, 0, 0),
      provider_id: user.id,
      user_id: user.id,
    });

    await createAppointmentService.execute({
      dateAppointment: new Date(2021, 4, 23, 13, 0, 0),
      provider_id: user.id,
      user_id: user.id,
    });

    await createAppointmentService.execute({
      dateAppointment: new Date(2021, 4, 23, 14, 0, 0),
      provider_id: user.id,
      user_id: user.id,
    });

    await createAppointmentService.execute({
      dateAppointment: new Date(2021, 4, 23, 15, 0, 0),
      provider_id: user.id,
      user_id: user.id,
    });

    await createAppointmentService.execute({
      dateAppointment: new Date(2021, 4, 23, 16, 0, 0),
      provider_id: user.id,
      user_id: user.id,
    });

    await createAppointmentService.execute({
      dateAppointment: new Date(2021, 4, 23, 17, 0, 0),
      provider_id: user.id,
      user_id: user.id,
    });

    const listProviderMonthAvailability = await listProviderMonthAvailabilityService.execute(
      {
        provider_id: user.id,
        month: 5,
        year: 2021,
      },
    );

    expect(listProviderMonthAvailability).toEqual(
      expect.arrayContaining([
        { day: 19, available: true },
        { day: 23, available: false },
        { day: 26, available: true },
      ]),
    );
  });
});
