import patientServices from '../services/patientServices.js';

async function getAllDoctors(req, res, next) {
  const { name, specialty, city, state } = req.query;

  try {
    const doctors = await patientServices.getAllDoctors({ name, specialty, city, state });
    res.send(doctors);
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
    res.send(doctorSchedule);
  } catch (err) {
    console.log(err);
    next(err);
  }
}

export default {
  getAllDoctors,
  getAllDoctorSchedules,
};
