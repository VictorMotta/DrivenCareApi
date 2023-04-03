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

export default {
  findSpecialtyByName,
  insertNewSpecialty,
  checkAmountSpecialtyDoctor,
  insertSpecialtyFromDoctor,
  checkDoctorHasSpecialty,
};
