import { Request, Response } from 'express'
import AppointmentRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentRepository'
import ListProviderService from '@modules/appointments/services/ListProviderService'
import { container } from 'tsyringe'

class ProvidersController {

  public async index(request: Request, response: Response): Promise<Response> {

    const listProviderService = container.resolve(ListProviderService)

    const { id } = request.user

    const appointment = await listProviderService.execute({
      user_id: id
    })

    return response.status(201).json(appointment)

  }

}

export default ProvidersController;
