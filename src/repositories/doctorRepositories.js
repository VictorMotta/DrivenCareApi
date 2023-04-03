import connectionDb from '../config/database.js';

async function getAllSchedulesDoctor({ doctorId }) {
  return await connectionDb.query(
    `
    SELECT 
      sch.id AS "schedulingId",
      atm.time AS "schedulingTime",
      u.name AS "patientName",
      s.name AS "specialtyName",
      sch.doctors_confirmation AS "confirmation",
      sch.finished 
    FROM scheduling sch
    JOIN users u
      ON u.id = sch.patient_id
    JOIN available_times atm
      ON atm.id = sch.available_times_id
    JOIN doctors_specialty ds
      ON ds.id = atm.specialty_id
    JOIN specialties s
      ON s.id = ds.specialty_id
    WHERE atm.doctor_id = $1;
  `,
    [doctorId]
  );
}

async function getAllSchedulesFinishedDoctor({ doctorId }) {
  return await connectionDb.query(
    `
    SELECT 
      sch.id AS "schedulingId",
      atm.time AS "schedulingTime",
      u.name AS "patientName",
      s.name AS "specialtyName",
      sch.doctors_confirmation AS "confirmation",
      sch.finished 
    FROM scheduling sch
    JOIN users u
      ON u.id = sch.patient_id
    JOIN available_times atm
      ON atm.id = sch.available_times_id
    JOIN doctors_specialty ds
      ON ds.id = atm.specialty_id
    JOIN specialties s
      ON s.id = ds.specialty_id
    WHERE atm.doctor_id = $1 AND sch.finished = 'true';
  `,
    [doctorId]
  );
}

async function findSpecialtyByName(specialty) {
  return await connectionDb.query(
    `
    SELECT * FROM specialties WHERE name = $1
  `,
    [specialty]
  );
}

async function insertNewSpecialty(specialty) {
  return await connectionDb.query(
    `
    INSERT INTO specialties (name) VALUES ($1) RETURNING id;
  `,
    [specialty]
  );
}

async function checkAmountSpecialtyDoctor(userId) {
  return await connectionDb.query(
    `
    SELECT COUNT(ds.id) 
    FROM doctors_specialty ds
      JOIN users u
      ON ds.user_id = u.id
    WHERE u.id = $1;
  `,
    [userId]
  );
}

async function insertSpecialtyFromDoctor({ userId, specialtyId }) {
  return await connectionDb.query(
    `
    INSERT INTO 
      doctors_specialty 
        (user_id, specialty_id) 
    VALUES 
      ($1,$2);
  `,
    [userId, specialtyId]
  );
}

async function checkDoctorHasSpecialty({ userId, specialtyId }) {
  return await connectionDb.query(
    `
      SELECT * FROM
      doctors_specialty 
      WHERE user_id = $1 AND specialty_id = $2;
  `,
    [userId, specialtyId]
  );
}

async function checkHoraryExist({ userId, time }) {
  return await connectionDb.query(
    `
      SELECT * FROM 
        available_times 
      WHERE 
        doctor_id = $1
      AND 
        time = $2;
  `,
    [userId, time]
  );
}

async function insertHorary({ time, userId, specialtyDoctorId }) {
  return await connectionDb.query(
    `
  INSERT INTO 
    available_times 
    (time, doctor_id, specialty_id) 
  VALUES 
    ($1, $2, $3)
  `,
    [time, userId, specialtyDoctorId]
  );
}

async function getSpecialtyDoctorById({ specialtyDoctorId }) {
  return await connectionDb.query(
    `
    SELECT * FROM doctors_specialty WHERE id = $1
  `,
    [specialtyDoctorId]
  );
}

async function checkScheduleIsFromDoc({ scheduleId, doctorId }) {
  return await connectionDb.query(
    `
    SELECT * FROM scheduling sch
    JOIN available_times atm
      ON atm.id = sch.available_times_id
    WHERE sch.id = $1 AND atm.doctor_id = $2; 
  `,
    [scheduleId, doctorId]
  );
}

async function confirmSchedules({ scheduleId }) {
  return await connectionDb.query(
    `
    UPDATE scheduling SET doctors_confirmation = 'true' WHERE id = $1;
  `,
    [scheduleId]
  );
}

async function cancelSchedules({ scheduleId }) {
  return await connectionDb.query(
    `
    UPDATE scheduling SET doctors_confirmation = 'false' WHERE id = $1;
  `,
    [scheduleId]
  );
}

async function finishedSchedules({ scheduleId }) {
  return await connectionDb.query(
    `
    UPDATE scheduling SET finished = 'true' WHERE id = $1;
  `,
    [scheduleId]
  );
}

export default {
  getAllSchedulesDoctor,
  getAllSchedulesFinishedDoctor,
  findSpecialtyByName,
  insertNewSpecialty,
  checkAmountSpecialtyDoctor,
  insertSpecialtyFromDoctor,
  checkDoctorHasSpecialty,
  checkHoraryExist,
  insertHorary,
  getSpecialtyDoctorById,
  checkScheduleIsFromDoc,
  confirmSchedules,
  cancelSchedules,
  finishedSchedules,
};
