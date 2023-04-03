import errors from '../errors/index.js';
import doctorRepositories from '../repositories/doctorRepositories.js';

async function insertSpecialty(specialty, user) {
  let specialtyId;

  const {
    rowCount: rowCountFindSpecialty,
    rows: [specialtyRow],
  } = await doctorRepositories.findSpecialtyByName(specialty);

  if (rowCountFindSpecialty) specialtyId = specialtyRow.id;

  if (!rowCountFindSpecialty) {
    specialtyId = await doctorRepositories.insertNewSpecialty(specialty);
  }
  console.log(specialtyId);

  if (specialtyId.rows) specialtyId = specialtyId.rows[0].id;

  console.log(specialtyId);
  const {
    rows: [qtySpecialty],
  } = await doctorRepositories.checkAmountSpecialtyDoctor(user.id);
  if (qtySpecialty.count >= 2) throw errors.doctorExceededSpecialtyLimitError();

  const { rowCount: doctorHasSpecialty } = await doctorRepositories.checkDoctorHasSpecialty({
    userId: user.id,
    specialtyId,
  });
  if (doctorHasSpecialty) throw errors.equalSpecialtiesError();

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
