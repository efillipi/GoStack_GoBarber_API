import { injectable, inject } from 'tsyringe';
import { classToClass } from 'class-transformer';
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import ICacheProvider from '@shared/Container/providers/CacheProvider/models/ICacheProvider';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import AppError from '@shared/errors/AppError';
import IAppointmentRepository from '../repositories/IAppointmentsRepository';

interface IRequest {
  id_client: string;
}

@injectable()
class ShowAppointments {
  constructor(
    @inject('AppointmentRepository')
    private appointmentsRepository: IAppointmentRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({ id_client }: IRequest): Promise<Appointment[]> {
    const cacheKey = `user-appointments:${id_client}`;

    let appointments = await this.cacheProvider.recover<Appointment[]>(
      cacheKey,
    );

    if (!appointments) {
      if (!id_client) {
        appointments = await this.appointmentsRepository.find();
      } else {
        const user = await this.usersRepository.findById(id_client);

        if (!user) {
          throw new AppError('usuário inexistente', 404);
        }
        appointments = await this.appointmentsRepository.findByIdClient(
          id_client,
        );
        await this.cacheProvider.save(cacheKey, classToClass(appointments));
      }
    }

    return appointments;
  }
}

export default ShowAppointments;
