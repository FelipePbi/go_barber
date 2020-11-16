import { Router, Request, Response } from 'express';
import CreateUserService from '../services/CreateUserService';

const router = Router();

router.post('/', async (request: Request, response: Response) => {
    try {
        const { name, email, password } = request.body;

        const create = new CreateUserService();

        const user = await create.execute({ name, email, password });

        return response.json(user);
    } catch (err) {
        return response.status(400).json({ error: err.message });
    }
});

export default router;
