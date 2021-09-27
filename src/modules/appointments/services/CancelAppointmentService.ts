import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import IOnesignalProvider from '@shared/Container/providers/OnesignalProvider/models/IOnesignalProvider';
import { format } from 'date-fns';
import ICacheProvider from '@shared/Container/providers/CacheProvider/models/ICacheProvider';
import IAppointmentRepository from '../repositories/IAppointmentsRepository';

interface IRequest {
  id_Appointment: string;
  user_id: string;
}

@injectable()
class CancelAppointmentService {
  constructor(
    @inject('AppointmentRepository')
    private appointmentsRepository: IAppointmentRepository,

    @inject('OnesignalProvider')
    private onesignalProvider: IOnesignalProvider,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({ id_Appointment, user_id }: IRequest): Promise<void> {
    const appointment = await this.appointmentsRepository.findById(
      id_Appointment,
    );

    if (!appointment) {
      throw new AppError('Appointment incorrect');
    }
    const dateFormatted = format(
      appointment.dateAppointment,
      "dd/MM/yyyy 'às' HH:mm'h'",
    );
    if (appointment.provider_id === user_id) {
      await this.onesignalProvider.send({
        textSend: `Agendamento Cancelado para dia ${dateFormatted}`,
        user_id: appointment.user_id,
      });
    } else {
      await this.onesignalProvider.send({
        textSend: `Agendamento Cancelado para dia ${dateFormatted}`,
        user_id: appointment.provider_id,
      });
    }

    await this.cacheProvider.invalidate(
      `provider-appointments:${appointment.provider_id}:${format(
        appointment.dateAppointment,
        'yyyy-M-d',
      )}`,
    );

    await this.appointmentsRepository.delete(id_Appointment);
  }
}

export default CancelAppointmentService;
