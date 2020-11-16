import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import Appointment from '../models/Appointment';
import AppointmentsRepository from '../repositories/AppointmentsRepository';

interface Request {
    provider_id: string;
    date: Date;
}

class CreateAppointmentService {
    public async execute({ provider_id, date }: Request): Promise<Appointment> {
        const Repository = getCustomRepository(AppointmentsRepository);

        const appointmentDate = startOfHour(date);

        const checkAppointmentsExists = await Repository.findByDate(
            appointmentDate,
        );

        if (checkAppointmentsExists) {
            throw Error('this appointment is already booked');
        }

        const appointment = Repository.create({
            provider_id,
            date,
        });

        await Repository.save(appointment);

        return appointment;
    }
}

export default CreateAppointmentService;
