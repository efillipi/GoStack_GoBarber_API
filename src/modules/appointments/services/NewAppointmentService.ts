import { injectable, inject } from 'tsyringe';
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import AppError from '@shared/errors/AppError';
import { isBefore, getHours, startOfHour } from 'date-fns';
import IAppointmentRepository from '../repositories/IAppointmentsRepository';

interface IRequest {
  provider_id: string;
  user_id: string;
  dateAppointment: Date;
}

@injectable()
class NewAppointmentService {
  constructor(
    @inject('AppointmentRepository')
    private appointmentsRepository: IAppointmentRepository,
  ) {}

  public async execute({
    provider_id,
    user_id,
    dateAppointment,
  }: IRequest): Promise<Appointment> {
    const date_Appointment = startOfHour(dateAppointment);

    if (isBefore(date_Appointment, Date.now())) {
      throw new AppError("You can't create an appointemnt on a past date.");
    }

    if (user_id === provider_id) {
      throw new AppError("You can't create an appointment with yourself.");
    }

    if (getHours(date_Appointment) < 8 || getHours(date_Appointment) > 17) {
      throw new AppError(
        'You can only create appointments between 8am and 5pm',
      );
    }

    const findByDate = await this.appointmentsRepository.findByDate(
      date_Appointment,
    );

    if (findByDate) {
      throw new AppError('This appointment is already booked');
    }

    const appointment = await this.appointmentsRepository.create({
      provider_id,
      user_id,
      dateAppointment: date_Appointment,
    });

    return appointment;
  }
}

export default NewAppointmentService;
