import connectionDb from '../config/database.js';

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
  return connectionDb.query(
    `
    SELECT * FROM doctors_specialty WHERE id = $1
  `,
    [specialtyDoctorId]
  );
}

export default {
  findSpecialtyByName,
  insertNewSpecialty,
  checkAmountSpecialtyDoctor,
  insertSpecialtyFromDoctor,
  checkDoctorHasSpecialty,
  checkHoraryExist,
  insertHorary,
  getSpecialtyDoctorById,
};
