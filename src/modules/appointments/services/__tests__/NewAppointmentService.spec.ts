import FakeAppointmentsRepository from '@modules/appointments/repositories/Fakes/FakeAppointmentRepository';
import CreateAppointmentService from '@modules/appointments/services/NewAppointmentService';
import AppError from '@shared/errors/AppError';

describe('CreateAppointment', () => {

    it('should be able to create a new appointment', async () => {
        const fakeAppointmentsRepository = new FakeAppointmentsRepository();
        const createAppointment = new CreateAppointmentService(
            fakeAppointmentsRepository,
        );

        const appointment = await createAppointment.execute({
            dateAppointment: new Date(),
            provider_id: '123123',
        });

        expect(appointment).toHaveProperty('id');
        expect(appointment.provider_id).toBe('123123');
    });

    it('should not be able to create two appointments on the same time', async () => {
        const fakeAppointmentsRepository = new FakeAppointmentsRepository();
        const createAppointment = new CreateAppointmentService(
            fakeAppointmentsRepository,
        );

        const dateAppointment = new Date(2021, 2, 10, 11)

        const appointment_one = await createAppointment.execute({
            dateAppointment,
            provider_id: '123123',
        });

        expect(
            createAppointment.execute({
                dateAppointment,
                provider_id: '123123',
            })
        ).rejects.toBeInstanceOf(AppError);
    });

    it('Show appointments', async () => {
        const fakeAppointmentsRepository = new FakeAppointmentsRepository();
        const createAppointment = new CreateAppointmentService(
            fakeAppointmentsRepository,
        );

        const appointment = await createAppointment.execute({
            dateAppointment: new Date(),
            provider_id: '123123',
        });

        const appointments = await fakeAppointmentsRepository.find()

        expect(appointments.length).toBe(1)
    });
});