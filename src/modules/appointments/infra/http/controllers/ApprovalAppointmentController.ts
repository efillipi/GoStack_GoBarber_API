import { Request, Response } from 'express';
import ApprovalAppointmentService from '@modules/appointments/services/ApprovalAppointmentService';
import { container } from 'tsyringe';

class ApprovalAppointmentController {
  public async index(request: Request, response: Response): Promise<Response> {
    const approvalAppointmentService = container.resolve(
      ApprovalAppointmentService,
    );

    const { id } = request.params;

    await approvalAppointmentService.execute({
      id_Appointment: id,
    });

    return response.status(204).json({});
  }
}

export default ApprovalAppointmentController;
