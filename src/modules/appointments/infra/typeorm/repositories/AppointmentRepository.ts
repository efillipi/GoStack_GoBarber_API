import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment'
import { getRepository, Repository, Raw } from 'typeorm'
import IAppointmentRepository from '@modules/appointments/repositories/IAppointmentsRepository'
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO'
import IFindallinMonthFromProviderDTO from '@modules/appointments/dtos/IFindallinMonthFromProviderDTO'
import IFindallinDayFromProviderDTO from '@modules/appointments/dtos/IFindallinDayFromProviderDTO'

class AppointmentRepository implements IAppointmentRepository {

  private ormRepository: Repository<Appointment>

  constructor() {
    this.ormRepository = getRepository(Appointment)
  }

  public async findByDate(dateAppointment: Date): Promise<Appointment | undefined> {

    const findByDate = await this.ormRepository.findOne({
      where: { dateAppointment }
    })

    return findByDate
  }

  public async findallinMonthFromProvider({ provider_id, month, year }: IFindallinMonthFromProviderDTO): Promise<Appointment[] | undefined> {

    const parseMonth = String(month).padStart(2, '0')

    const appointments = await this.ormRepository.find({
      where: {
        provider_id,
        dateAppointment: Raw(dateFieldName =>
          `to_char(${dateFieldName}, 'MM-YYYY') = '${parseMonth}-${year}'`
        )
      }
    })

    return appointments
  }

  public async findallInDayFromProvider({ provider_id, month, year, day }: IFindallinDayFromProviderDTO): Promise<Appointment[] | undefined> {

    const parseMonth = String(month).padStart(2, '0')
    const parseDay = String(day).padStart(2, '0')

    const appointments = await this.ormRepository.find({
      where: {
        provider_id,
        dateAppointment: Raw(dateFieldName =>
          `to_char(${dateFieldName}, 'DD-MM-YYYY') = '${parseDay}-${parseMonth}-${year}'`
        )
      }
    })

    return appointments
  }

  public async create({ provider_id, dateAppointment }: ICreateAppointmentDTO): Promise<Appointment | undefined> {

    const appointment = this.ormRepository.create({
      provider_id,
      dateAppointment
    })

    await this.ormRepository.save(appointment)

    return appointment
  }

  public async find(): Promise<Appointment[] | undefined> {

    const Appointment = await this.ormRepository.find({
    })
    return Appointment
  }
}


export default AppointmentRepository
