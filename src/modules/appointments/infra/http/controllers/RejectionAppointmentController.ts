import { Request, Response } from 'express';
import RejectionAppointmentService from '@modules/appointments/services/RejectionAppointmentService';
import { container } from 'tsyringe';

class RejectionAppointmentController {
  public async index(request: Request, response: Response): Promise<Response> {
    const rejectionAppointmentService = container.resolve(
      RejectionAppointmentService,
    );

    const { id } = request.params;

    await rejectionAppointmentService.execute({
      id_Appointment: id,
    });

    return response.status(204).json({});
  }
}

export default RejectionAppointmentController;
