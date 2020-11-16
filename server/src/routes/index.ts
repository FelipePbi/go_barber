import { Router } from 'express';

import UsersRoutes from './users.routes';
import AppointmentsRoutes from './appointments.routes';

const routes = Router();

routes.use('/api/v1/appointments', AppointmentsRoutes);
routes.use('/api/v1/users', UsersRoutes);

export default routes;
