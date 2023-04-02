import { Router } from 'express';
import authControllers from '../controllers/authControllers.js';
import { validateSchema } from '../middlewares/schemaValidationMiddleware.js';
import { signUpUserSchema } from '../schemas/authSchemas.js';

const authRoutes = Router();

authRoutes.post('/', validateSchema(signUpUserSchema), authControllers.signUp);

export default authRoutes;
