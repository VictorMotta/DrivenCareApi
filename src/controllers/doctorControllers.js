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

async function getAllSchedulesFinishedDoctor(req, res, next) {
  const user = res.locals.user;
  try {
    const schedulesFinishedDoctor = await doctorServices.getAllSchedulesFinishedDoctor({ user });
    return res.send(schedulesFinishedDoctor);
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
async function confirmSchedules(req, res, next) {
  const { scheduleId } = req.params;
  const user = res.locals.user;

  try {
    await doctorServices.confirmSchedules({ scheduleId, user });
    return res.sendStatus(200);
  } catch (err) {
    next(err);
  }
}

async function cancelSchedules(req, res, next) {
  const { scheduleId } = req.params;
  const user = res.locals.user;

  try {
    await doctorServices.cancelSchedules({ scheduleId, user });
    return res.sendStatus(200);
  } catch (err) {
    next(err);
  }
}

async function finishedSchedules(req, res, next) {
  const { scheduleId } = req.params;
  const user = res.locals.user;

  try {
    await doctorServices.finishedSchedules({ scheduleId, user });
    return res.sendStatus(200);
  } catch (err) {
    next(err);
  }
}

export default {
  getAllSchedulesDoctor,
  getAllSchedulesFinishedDoctor,
  insertSpecialty,
  insertHorary,
  confirmSchedules,
  cancelSchedules,
  finishedSchedules,
};
