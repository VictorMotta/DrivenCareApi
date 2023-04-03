import errors from '../errors/index.js';
import doctorRepositories from '../repositories/doctorRepositories.js';

async function getAllSchedulesDoctor({ user }) {
  if (!user.is_doctor)
    throw errors.unauthorizedMessageError('Only doctors can see scheduled appointments.');

  const { rowCount: rowCountSchedulesDoctor, rows: schedulesDoctor } =
    await doctorRepositories.getAllSchedulesDoctor({ doctorId: user.id });
  if (!rowCountSchedulesDoctor) throw errors.notFoundMessageError('No consultation available.');

  return schedulesDoctor;
}

async function getAllSchedulesFinishedDoctor({ user }) {
  if (!user.is_doctor)
    throw errors.unauthorizedMessageError('Only doctors can see all scheduled finished.');

  const { rowCount: rowCountSchedulesDoctor, rows: schedulesDoctor } =
    await doctorRepositories.getAllSchedulesFinishedDoctor({ doctorId: user.id });
  if (!rowCountSchedulesDoctor) throw errors.notFoundMessageError('No consultation finished.');

  return schedulesDoctor;
}

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

async function insertHorary({ time, specialtyDoctorId, user }) {
  const dateTime = new Date(time);
  const nowDate = new Date(Date.now());

  if (!user.is_doctor)
    throw errors.unauthorizedMessageError('Only doctors can register schedules.');

  if (nowDate.getTime() > dateTime.getTime()) throw errors.conflictError('Invalid date and time.');

  const { rowCount } = await doctorRepositories.checkHoraryExist({ userId: user.id, time });
  if (rowCount)
    throw errors.conflictError('This date and time has already been registered before.');

  const {
    rowCount: rowCountSpecialtyDoctor,
    rows: [specialtyDoctor],
  } = await doctorRepositories.getSpecialtyDoctorById({
    specialtyDoctorId,
  });

  if (!rowCountSpecialtyDoctor)
    throw errors.notFoundMessageError(
      'Register this specialty first before registering a schedule.'
    );

  if (specialtyDoctor.user_id !== user.id)
    throw errors.unauthorizedMessageError(
      'Indicated specialty is not yours, check if you put it correctly.'
    );

  await doctorRepositories.insertHorary({ time, userId: user.id, specialtyDoctorId });
}

async function confirmSchedules({ scheduleId, user }) {
  if (!user.is_doctor)
    throw errors.unauthorizedMessageError('Only doctors can confirm an appointment.');

  const {
    rowCount: rowCountVerifyIsDoc,
    rows: [scheduleFromDoc],
  } = await doctorRepositories.checkScheduleIsFromDoc({
    scheduleId,
    doctorId: user.id,
  });
  if (!rowCountVerifyIsDoc) throw errors.unauthorizedError();

  if (scheduleFromDoc.doctors_confirmation === true)
    throw errors.unauthorizedMessageError(
      'You cannot confirm something that is already confirmed.'
    );

  await doctorRepositories.confirmSchedules({ scheduleId });
}

async function cancelSchedules({ scheduleId, user }) {
  if (!user.is_doctor)
    throw errors.unauthorizedMessageError('Only doctors can cancel an appointment.');

  const {
    rowCount: rowCountVerifyIsDoc,
    rows: [scheduleFromDoc],
  } = await doctorRepositories.checkScheduleIsFromDoc({
    scheduleId,
    doctorId: user.id,
  });
  if (!rowCountVerifyIsDoc) throw errors.unauthorizedError();

  if (scheduleFromDoc.doctors_confirmation === false)
    throw errors.unauthorizedMessageError('You cannot cancel something that is already cancelled.');

  await doctorRepositories.cancelSchedules({ scheduleId });
}

async function finishedSchedules({ scheduleId, user }) {
  if (!user.is_doctor)
    throw errors.unauthorizedMessageError('Only doctors can finish an appointment.');

  const {
    rowCount: rowCountVerifyIsDoc,
    rows: [scheduleFromDoc],
  } = await doctorRepositories.checkScheduleIsFromDoc({
    scheduleId,
    doctorId: user.id,
  });
  if (!rowCountVerifyIsDoc) throw errors.unauthorizedError();

  if (scheduleFromDoc.finished === true)
    throw errors.unauthorizedMessageError('You cannot finish something that is already finished.');

  await doctorRepositories.finishedSchedules({ scheduleId });
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
