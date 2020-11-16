import { parseISO } from 'date-fns';
import { Router, Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';

import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentsService from '../services/CreateAppointmentsService';

const router = Router();

router.get('/', async (request: Request, response: Response) => {
    const Repository = getCustomRepository(AppointmentsRepository);
    const appointment = await Repository.find();

    return response.json(appointment);
});

router.post('/', async (request: Request, response: Response) => {
    try {
        const { provider_id, date } = request.body;

        const parseDate = parseISO(date);

        const create = new CreateAppointmentsService();

        const created = await create.execute({
            provider_id,
            date: parseDate,
        });

        return response.json(created);
    } catch (err) {
        return response.status(400).json({ error: err.message });
    }
});

export default router;
