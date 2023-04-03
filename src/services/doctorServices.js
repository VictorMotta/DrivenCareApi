import errors from '../errors/index.js';
import doctorRepositories from '../repositories/doctorRepositories.js';

async function insertSpecialty(specialty, user) {
  let specialtyId;

  const {
    rowCount,
    rows: [specialtyRow],
  } = await doctorRepositories.findSpecialtyByName(specialty);

  if (rowCount) specialtyId = specialtyRow.id;

  if (!rowCount) specialtyId = await doctorRepositories.insertNewSpecialty(specialty);

  const {
    rows: [qtySpecialty],
  } = await doctorRepositories.checkAmountSpecialtyDoctor(user.id);
  if (qtySpecialty.count >= 2) throw errors.doctorExceededSpecialtyLimitError();

  const { rowCount: doctorHasSpecialty } = await doctorRepositories.checkDoctorHasSpecialty({
    userId: user.id,
    specialtyId,
  });
  if (doctorHasSpecialty) throw errors.equalSpecialtiesError();

  console.log(user.id);
  console.log(specialtyId);
  await doctorRepositories.insertSpecialtyFromDoctor({ userId: user.id, specialtyId });
}

async function insertHorary({ time, user }) {
  const dateTime = new Date(time);
  const nowDate = new Date(Date.now());

  if (nowDate.getTime() > dateTime.getTime()) throw errors.conflictError('Invalid date and time.');

  const { rowCount } = await doctorRepositories.checkHoraryExist({ userId: user.id, time });
  if (rowCount)
    throw errors.conflictError('This date and time has already been registered before.');

  await doctorRepositories.insertHorary({ time, userId: user.id });
}

export default {
  insertSpecialty,
  insertHorary,
};
