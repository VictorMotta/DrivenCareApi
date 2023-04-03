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

export default {
  insertSpecialty,
};
