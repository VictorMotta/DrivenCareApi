import doctorServices from '../services/doctorServices.js';

async function insertSpecialty(req, res, next) {
  const { specialty } = req.body;
  const user = res.locals.user;

  try {
    await doctorServices.insertSpecialty(specialty, user);
    return res.sendStatus(201);
  } catch (err) {
    next(err);
  }
}

export default {
  insertSpecialty,
};