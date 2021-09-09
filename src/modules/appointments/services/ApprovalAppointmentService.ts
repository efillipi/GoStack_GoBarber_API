import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import IAppointmentRepository from '../repositories/IAppointmentsRepository';

interface IRequest {
  id_Appointment: string;
}

@injectable()
class ApprovalAppointmentService {
  constructor(
    @inject('AppointmentRepository')
    private appointmentsRepository: IAppointmentRepository,
  ) {}

  public async execute({ id_Appointment }: IRequest): Promise<void> {
    const appointment = await this.appointmentsRepository.findById(
      id_Appointment,
    );

    if (!appointment) {
      throw new AppError('Appointment incorrect');
    }

    appointment.approved = true;

    await this.appointmentsRepository.save(appointment);
  }
}

export default ApprovalAppointmentService;
