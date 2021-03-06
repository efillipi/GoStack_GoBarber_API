import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment'
import { getRepository, Repository } from 'typeorm'
import IAppointmentRepository from '@modules/appointments/repositories/IAppointmentsRepository'
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO'

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
