import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import IOnesignalProvider from '@shared/Container/providers/OnesignalProvider/models/IOnesignalProvider';
import { format } from 'date-fns';
import IAppointmentRepository from '../repositories/IAppointmentsRepository';

interface IRequest {
  id_Appointment: string;
}

@injectable()
class RejectionAppointmentService {
  constructor(
    @inject('AppointmentRepository')
    private appointmentsRepository: IAppointmentRepository,

    @inject('OnesignalProvider')
    private onesignalProvider: IOnesignalProvider,
  ) {}

  public async execute({ id_Appointment }: IRequest): Promise<void> {
    const appointment = await this.appointmentsRepository.findById(
      id_Appointment,
    );

    if (!appointment) {
      throw new AppError('Appointment incorrect');
    }

    await this.appointmentsRepository.delete(id_Appointment);

    const dateFormatted = format(
      appointment.dateAppointment,
      "dd/MM/yyyy 'às' HH:mm'h'",
    );

    await this.onesignalProvider.send({
      textSend: `Agendamento Cancelado para dia ${dateFormatted}`,
      user_id: appointment.user_id,
    });
  }
}

export default RejectionAppointmentService;
