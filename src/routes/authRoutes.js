import { Router } from 'express';
import authControllers from '../controllers/authControllers.js';
import { validateSchema } from '../middlewares/schemaValidationMiddleware.js';
import { signUpUserSchema } from '../schemas/authSchemas.js';

const authRoutes = Router();

authRoutes.post('/signup', validateSchema(signUpUserSchema), authControllers.signUp);
authRoutes.post('/signin', authControllers.signIn);

export default authRoutes;
