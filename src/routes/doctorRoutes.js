import { Router } from 'express';
import authenticationValidation from '../middlewares/authenticationMiddleware.js';
import doctorControllers from '../controllers/doctorControllers.js';
import { validateSchema } from '../middlewares/schemaValidationMiddleware.js';
import { insertHorarySchema, insertSpecialtySchema } from '../schemas/doctorSchemas.js';
import doctorMiddlewares from '../middlewares/doctorMiddlewares.js';

const doctorRouter = Router();

doctorRouter.get('/schedules', authenticationValidation, doctorControllers.getAllSchedulesDoctor);

doctorRouter.get(
  '/schedules/finish',
  authenticationValidation,
  doctorControllers.getAllSchedulesFinishedDoctor
);

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
doctorRouter.put(
  '/schedules/confirm/:scheduleId',
  authenticationValidation,
  doctorControllers.confirmSchedules
);
doctorRouter.put(
  '/schedules/cancel/:scheduleId',
  authenticationValidation,
  doctorControllers.cancelSchedules
);

doctorRouter.put(
  '/schedules/finish/:scheduleId',
  authenticationValidation,
  doctorControllers.finishedSchedules
);

export default doctorRouter;
