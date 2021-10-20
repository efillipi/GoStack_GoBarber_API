import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';
import IFindallinMonthFromProviderDTO from '@modules/appointments/dtos/IFindallinMonthFromProviderDTO';
import IFindallinDayFromProviderDTO from '@modules/appointments/dtos/IFindallinDayFromProviderDTO';

export default interface IAppointmentRepository {
  findByDate(
    dateAppointment: Date,
    provider_id: string,
  ): Promise<Appointment | undefined>;
  findallinMonthFromProvider(
    data: IFindallinMonthFromProviderDTO,
  ): Promise<Appointment[] | undefined>;
  create(data: ICreateAppointmentDTO): Promise<Appointment>;
  find(): Promise<Appointment[]>;
  findById(id_Appointment: string): Promise<Appointment>;
  findByIdClient(id_client: string, approved: string): Promise<Appointment[]>;
  findallInDayFromProvider(
    data: IFindallinDayFromProviderDTO,
  ): Promise<Appointment[]>;
  save(appointment: Appointment): Promise<Appointment>;
  delete(id_Appointment: string): Promise<void>;
  approved(approved: string): Promise<Appointment[]>;
}
