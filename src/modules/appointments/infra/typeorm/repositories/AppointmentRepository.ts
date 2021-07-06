import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import { getRepository, Repository, Raw } from 'typeorm';
import IAppointmentRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';
import IFindallinMonthFromProviderDTO from '@modules/appointments/dtos/IFindallinMonthFromProviderDTO';
import IFindallinDayFromProviderDTO from '@modules/appointments/dtos/IFindallinDayFromProviderDTO';

class AppointmentRepository implements IAppointmentRepository {
  private ormRepository: Repository<Appointment>;

  constructor() {
    this.ormRepository = getRepository(Appointment);
  }

  public async findByDate(
    dateAppointment: Date,
  ): Promise<Appointment | undefined> {
    const findByDate = await this.ormRepository.findOne({
      where: { dateAppointment },
    });

    return findByDate;
  }

  public async findallinMonthFromProvider({
    provider_id,
    month,
    year,
  }: IFindallinMonthFromProviderDTO): Promise<Appointment[] | undefined> {
    const parsedMonth = String(month).padStart(2, '0');

    const appointments = await this.ormRepository.find({
      where: {
        provider_id,
        dateAppointment: Raw(
          dateFieldName =>
            `DATE_FORMAT(${dateFieldName}, '%Y-%m') = '${year}-${parsedMonth}'`,
        ),
      },
    });

    return appointments;
  }

  public async findallInDayFromProvider({
    provider_id,
    day,
    month,
    year,
  }: IFindallinDayFromProviderDTO): Promise<Appointment[]> {
    const parsedDay = String(day).padStart(2, '0');
    const parsedMonth = String(month).padStart(2, '0');

    const appointments = await this.ormRepository.find({
      where: {
        provider_id,
        dateAppointment: Raw(
          dateFieldName =>
            `DATE_FORMAT(${dateFieldName}, '%Y-%m-%d') = '${year}-${parsedMonth}-${parsedDay}'`,
        ),
      },
      relations: ['user'],
    });

    return appointments;
  }

  public async create({
    provider_id,
    user_id,
    dateAppointment,
  }: ICreateAppointmentDTO): Promise<Appointment | undefined> {
    const appointment = this.ormRepository.create({
      provider_id,
      user_id,
      dateAppointment,
    });

    await this.ormRepository.save(appointment);

    return appointment;
  }

  public async find(): Promise<Appointment[] | undefined> {
    const appointment = await this.ormRepository.find();
    return appointment;
  }
}

export default AppointmentRepository;
