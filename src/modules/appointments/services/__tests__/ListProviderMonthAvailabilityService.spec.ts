import FakeAppointmentsRepository from '@modules/appointments/repositories/Fakes/FakeAppointmentRepository';
import ListProviderMonthAvailabilityService from '@modules/appointments/services/ListProviderMonthAvailabilityService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listProviderMonthAvailabilityService: ListProviderMonthAvailabilityService;

describe('ListProviderMonthAvailability', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();

    listProviderMonthAvailabilityService =
      new ListProviderMonthAvailabilityService(fakeAppointmentsRepository);
  });

  it('should be able to create a new appointment', async () => {
    await fakeAppointmentsRepository.create({
      dateAppointment: new Date(2021, 4, 23, 8, 0, 0),
      provider_id: 'provider_id',
      user_id: 'user_id',
    });
    await fakeAppointmentsRepository.create({
      dateAppointment: new Date(2021, 4, 23, 9, 0, 0),
      provider_id: 'provider_id',
      user_id: 'user_id',
    });

    await fakeAppointmentsRepository.create({
      dateAppointment: new Date(2021, 4, 23, 10, 0, 0),
      provider_id: 'provider_id',
      user_id: 'user_id',
    });

    await fakeAppointmentsRepository.create({
      dateAppointment: new Date(2021, 4, 23, 11, 0, 0),
      provider_id: 'provider_id',
      user_id: 'user_id',
    });

    await fakeAppointmentsRepository.create({
      dateAppointment: new Date(2021, 4, 23, 12, 0, 0),
      provider_id: 'provider_id',
      user_id: 'user_id',
    });

    await fakeAppointmentsRepository.create({
      dateAppointment: new Date(2021, 4, 23, 13, 0, 0),
      provider_id: 'provider_id',
      user_id: 'user_id',
    });

    await fakeAppointmentsRepository.create({
      dateAppointment: new Date(2021, 4, 23, 14, 0, 0),
      provider_id: 'provider_id',
      user_id: 'user_id',
    });

    await fakeAppointmentsRepository.create({
      dateAppointment: new Date(2021, 4, 23, 15, 0, 0),
      provider_id: 'provider_id',
      user_id: 'user_id',
    });

    await fakeAppointmentsRepository.create({
      dateAppointment: new Date(2021, 4, 23, 16, 0, 0),
      provider_id: 'provider_id',
      user_id: 'user_id',
    });

    await fakeAppointmentsRepository.create({
      dateAppointment: new Date(2021, 4, 23, 17, 0, 0),
      provider_id: 'provider_id',
      user_id: 'user_id',
    });

    const listProviderMonthAvailability =
      await listProviderMonthAvailabilityService.execute({
        provider_id: 'provider_id',
        month: 5,
        year: 2021,
      });

    expect(listProviderMonthAvailability).toEqual(
      expect.arrayContaining([
        { day: 19, available: true },
        { day: 23, available: false },
        { day: 26, available: true },
      ]),
    );
  });
});
