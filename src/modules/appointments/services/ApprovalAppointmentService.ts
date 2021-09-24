import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import { format } from 'date-fns';
import IOnesignalProvider from '@shared/Container/providers/OnesignalProvider/models/IOnesignalProvider';
import ICacheProvider from '@shared/Container/providers/CacheProvider/models/ICacheProvider';
import IAppointmentRepository from '../repositories/IAppointmentsRepository';

interface IRequest {
  id_Appointment: string;
}

@injectable()
class ApprovalAppointmentService {
  constructor(
    @inject('AppointmentRepository')
    private appointmentsRepository: IAppointmentRepository,

    @inject('OnesignalProvider')
    private onesignalProvider: IOnesignalProvider,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
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

    const dateFormatted = format(
      appointment.dateAppointment,
      "dd/MM/yyyy 'às' HH:mm'h'",
    );

    await this.onesignalProvider.send({
      textSend: `Agendamento Aprovado para dia ${dateFormatted}`,
      user_id: appointment.user_id,
    });
    await this.cacheProvider.invalidate(
      `provider-appointments:${appointment.provider_id}:${format(
        appointment.dateAppointment,
        'yyyy-M-d',
      )}`,
    );
  }
}

export default ApprovalAppointmentService;
