import { injectable, inject } from 'tsyringe';
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import AppError from '@shared/errors/AppError';
import IAppointmentRepository from '../repositories/IAppointmentsRepository';

interface IRequest {
  id_client?: string;
  approved?: string;
}

@injectable()
class ShowAppointments {
  constructor(
    @inject('AppointmentRepository')
    private appointmentsRepository: IAppointmentRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({
    id_client,
    approved,
  }: IRequest): Promise<Appointment[]> {
    let appointments: Appointment[] = [];

    if (approved) {
      if (approved !== 'false' && approved !== 'true') {
        throw new AppError('approved incorrect');
      }
    }

    if (!id_client && !approved) {
      appointments = await this.appointmentsRepository.find();
    } else if (approved && id_client) {
      const user = await this.usersRepository.findById(id_client);

      if (!user) {
        throw new AppError('usuário inexistente', 404);
      }

      appointments = await this.appointmentsRepository.findByIdClient(
        id_client,
        approved,
      );
    } else if (approved && !id_client) {
      appointments = await this.appointmentsRepository.approved(approved);
    }

    return appointments;
  }
}

export default ShowAppointments;
