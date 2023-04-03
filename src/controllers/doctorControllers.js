import doctorServices from '../services/doctorServices.js';

async function getAllSchedulesDoctor(req, res, next) {
  const user = res.locals.user;
  try {
    const schedulesDoctor = await doctorServices.getAllSchedulesDoctor({ user });
    return res.send(schedulesDoctor);
  } catch (err) {
    next(err);
  }
}

async function insertSpecialty(req, res, next) {
  const { specialty } = req.body;
  const user = res.locals.user;

  try {
    await doctorServices.insertSpecialty(specialty, user);
    return res.sendStatus(201);
  } catch (err) {
    console.log(err);
    next(err);
  }
}

async function insertHorary(req, res, next) {
  const { time, specialtyDoctorId } = req.body;
  const user = res.locals.user;
  try {
    await doctorServices.insertHorary({ time, specialtyDoctorId, user });
    return res.sendStatus(201);
  } catch (err) {
    next(err);
  }
}

export default {
  getAllSchedulesDoctor,
  insertSpecialty,
  insertHorary,
};
