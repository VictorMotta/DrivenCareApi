import { Router } from 'express';
import authRoutes from './authRoutes.js';
import doctorRouter from './doctorRoutes.js';
import patientRouter from './patientRoutes.js';

const routes = Router();

routes.use('/auth', authRoutes);
routes.use('/doctor', doctorRouter);
routes.use('/patient', patientRouter);

export default routes;
