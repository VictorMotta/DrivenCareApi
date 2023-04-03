import { Router } from 'express';
import authRoutes from './authRoutes.js';
import doctorRouter from './doctorRoutes.js';

const routes = Router();

routes.use('/auth', authRoutes);
routes.use('/doctor', doctorRouter);

export default routes;
