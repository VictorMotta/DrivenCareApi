import { Router } from 'express';
import authenticationValidation from '../middlewares/authenticationMiddleware.js';
import patientControllers from '../controllers/patientControllers.js';

const patientRouter = Router();

patientRouter.get('/', authenticationValidation, patientControllers.getAllDoctors);
patientRouter.get(
  '/horary/:doctorId',
  authenticationValidation,
  patientControllers.getAllDoctorSchedules
);
patientRouter.post(
  '/horary/schedule/:timeId',
  authenticationValidation,
  patientControllers.scheduleNewHorary
);

export default patientRouter;
