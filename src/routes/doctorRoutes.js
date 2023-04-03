import { Router } from 'express';
import authenticationValidation from '../middlewares/authenticationMiddleware.js';
import doctorControllers from '../controllers/doctorControllers.js';
import { validateSchema } from '../middlewares/schemaValidationMiddleware.js';
import { insertHorarySchema, insertSpecialtySchema } from '../schemas/doctorSchemas.js';
import doctorMiddlewares from '../middlewares/doctorMiddlewares.js';

const doctorRouter = Router();

doctorRouter.get('/', authenticationValidation, doctorControllers.getAllDoctors);

doctorRouter.post(
  '/specialty',
  validateSchema(insertSpecialtySchema),
  authenticationValidation,
  doctorMiddlewares.checkAreDoctor,
  doctorControllers.insertSpecialty
);
doctorRouter.post(
  '/horary',
  validateSchema(insertHorarySchema),
  authenticationValidation,
  doctorControllers.insertHorary
);

export default doctorRouter;
