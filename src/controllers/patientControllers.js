import patientServices from '../services/patientServices.js';

async function getAllDoctors(req, res, next) {
  const { name, specialty, city, state } = req.query;

  try {
    const doctors = await patientServices.getAllDoctors({ name, specialty, city, state });
    return res.send(doctors);
  } catch (err) {
    console.log(err);
    next(err);
  }
}

async function getAllDoctorSchedules(req, res, next) {
  const { doctorId } = req.params;
  const user = res.locals.user;
  try {
    const doctorSchedule = await patientServices.getAllDoctorSchedules({
      doctorId,
      user,
    });
    return res.send(doctorSchedule);
  } catch (err) {
    next(err);
  }
}

async function getAllSchedulesPatient(req, res, next) {
  const user = res.locals.user;
  try {
    const allSchedulesPatient = await patientServices.getAllSchedulesPatient({ user });
    return res.send(allSchedulesPatient);
  } catch (err) {
    next(err);
  }
}

async function getAllSchedulesFinishedPatient(req, res, next) {
  const user = res.locals.user;
  try {
    const schedulesFinishedPatient = await patientServices.getAllSchedulesFinishedPatient({ user });
    return res.send(schedulesFinishedPatient);
  } catch (err) {
    next(err);
  }
}

async function scheduleNewHorary(req, res, next) {
  const { timeId } = req.params;
  const user = res.locals.user;
  try {
    await patientServices.scheduleNewHorary({ timeId, user });
    return res.sendStatus(201);
  } catch (err) {
    next(err);
  }
}

export default {
  getAllDoctors,
  getAllDoctorSchedules,
  getAllSchedulesPatient,
  getAllSchedulesFinishedPatient,
  scheduleNewHorary,
};
