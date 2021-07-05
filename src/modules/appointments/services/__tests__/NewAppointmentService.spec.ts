import FakeAppointmentsRepository from '@modules/appointments/repositories/Fakes/FakeAppointmentRepository';
import FakeUserRepository from '@modules/users/repositories/Fakes/FakeUserRepository';
import CreateAppointmentService from '@modules/appointments/services/NewAppointmentService';
import CreateUserService from '@modules/users/services/CreateUserService';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';

let fakeHashProvider: FakeHashProvider;
let createUserService: CreateUserService;
let fakeAppointmentsRepository: FakeAppointmentsRepository;
let createAppointmentService: CreateAppointmentService;
let fakeUserRepository: FakeUserRepository;

describe('CreateAppointment', () => {
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
  });

  it('should be able to create a new appointment', async () => {
    const user = await createUserService.execute({
      email: 'user@example.com',
      name: 'User Example',
      password: '123456',
    });

    const appointment = await createAppointmentService.execute({
      dateAppointment: new Date(),
      provider_id: user.id,
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe(user.id);
  });
});
