import { Router } from 'express';
import { getCustomRepository } from 'typeorm';
import { parseISO } from 'date-fns';

import AppointmentRepository from '../repositories/AppointmentRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';

const appointmentsRouter = Router();

appointmentsRouter.get('/', async (req, res) => {
    const appointmentRepository = getCustomRepository(AppointmentRepository);
    const appointments = await appointmentRepository.find();

    return res.json(appointments);
});

appointmentsRouter.post('/', async (req, res) => {
    try {
        const { provider_id, date } = req.body;

        const parsedDate = parseISO(date);

        const createAppointmentService = new CreateAppointmentService();

        const appointment = await createAppointmentService.execute({
            provider_id,
            date: parsedDate,
        });

        return res.json(appointment);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
});

export default appointmentsRouter;
