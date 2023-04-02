import { Router } from 'express';
import authRoutes from './authRoutes.js';

const routes = Router();

routes.use('/users', authRoutes);

export default routes;
