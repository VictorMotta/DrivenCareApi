import errors from '../errors/index.js';
import patientRepositories from '../repositories/patientRepositories.js';

async function getAllDoctors({ name, specialty, city, state }) {
  if (!name) name = null;
  if (!specialty) specialty = null;
  if (!city) city = null;
  if (!state) state = null;

  const { rowCount, rows: doctors } = await patientRepositories.getAllDoctors({
    name,
    specialty,
    city,
    state,
  });
  if (!rowCount) throw errors.notFoundError();

  return doctors;
}

async function getAllDoctorSchedules({ doctorId, user }) {
  const { rowCount: rowCountVerifyDocExist } = await patientRepositories.getDoctorById({
    doctorId,
  });
  if (!rowCountVerifyDocExist) throw errors.notFoundError();

  if (user.is_doctor && user.id !== +doctorId)
    throw errors.unauthorizedMessageError("Only patients can see other doctors' schedules.");

  const { rowCount: rowCountHorary, rows: schedules } =
    await patientRepositories.getAllDoctorSchedules({ doctorId });
  if (!rowCountHorary) throw errors.notFoundError();

  return schedules;
}

async function getAllSchedulesPatient({ user }) {
  if (user.is_doctor) throw errors.notFoundMessageError('Only patients have appointments.');

  const { rowCount: rowCountSchedules, rows: schedules } =
    await patientRepositories.getAllSchedulesPatient({
      patientId: user.id,
    });

  if (!rowCountSchedules)
    throw errors.notFoundMessageError('Make an appointment with a doctor to show up here!');

  return schedules;
}

async function getAllSchedulesFinishedPatient({ user }) {
  if (user.is_doctor)
    throw errors.unauthorizedMessageError('Only the user can see their completed appointments.');

  const { rowCount: rowCountSchedulesPatient, rows: schedulesPatient } =
    await patientRepositories.getAllSchedulesFinishedPatient({ patientId: user.id });
  if (!rowCountSchedulesPatient) throw errors.notFoundMessageError('No history found.');

  return schedulesPatient;
}

async function scheduleNewHorary({ timeId, user }) {
  const {
    rowCount: rowCountVerifyHoraryExist,
    rows: [timeDoctor],
  } = await patientRepositories.getHoraryById({
    timeId,
  });
  if (!rowCountVerifyHoraryExist) throw errors.notFoundError();

  if (user.is_doctor === true)
    throw errors.unauthorizedMessageError(
      'Only patients can schedule an appointment, create an account as a patient and log in.'
    );

  if (timeDoctor.doctor_id === user.id)
    throw errors.conflictError('You cannot schedule an appointment with yourself.');

  if (!timeDoctor.available)
    throw errors.unauthorizedMessageError('You cannot make an appointment at an unavailable time.');

  await patientRepositories.scheduleNewHorary({ userId: user.id, timeId });
}

export default {
  getAllDoctors,
  getAllDoctorSchedules,
  getAllSchedulesPatient,
  getAllSchedulesFinishedPatient,
  scheduleNewHorary,
};
