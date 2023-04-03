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

export default {
  getAllDoctors,
  getAllDoctorSchedules,
};
