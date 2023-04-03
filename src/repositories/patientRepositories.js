import connectionDb from '../config/database.js';

async function getAllDoctors({ name, specialty, city, state }) {
  return await connectionDb.query(
    `
  SELECT 
    json_build_object(
      'id', u.id,
      'doctorName', u.name,
      'doctorEmail', u.email,
      'doctorTelephone', u.telephone,
      'doctorCrm', u.crm,
      'doctorAddress', u.address,
      'doctorCity', u.city,
      'doctorState', u.state,
      'doctorClinicNumber', u.house_number,
      'specialties', array_agg(json_build_object(
        'id', s.id,
        'name', s.name
      ))
    ) AS "doctor"
  FROM users u
  LEFT JOIN doctors_specialty ds
    ON ds.user_id = u.id
  LEFT JOIN specialties s
    ON s.id = ds.specialty_id
  WHERE is_doctor = true 
    AND (u.name = $1 OR $1 IS NULL)
    AND (s.name = $2 OR $2 IS NULL)
    AND (u.city = $3 OR $3 IS NULL)
    AND (u.state = $4 OR $4 IS NULL)
  GROUP BY u.id;
  `,
    [name, specialty, city, state]
  );
}

async function getDoctorById({ doctorId }) {
  return connectionDb.query(
    `
    SELECT * 
    FROM users 
    WHERE id = $1 
      AND is_doctor = true;
  `,
    [doctorId]
  );
}

async function getAllDoctorSchedules({ doctorId }) {
  return await connectionDb.query(
    `
    SELECT "at".id AS "timeId", u.name AS "doctorName", "at".time, "at".available
    FROM available_times "at"
    JOIN users u
      ON "at".doctor_id = u.id
    WHERE doctor_id = $1 
      AND "at".available = true
      AND time > NOW();
  `,
    [doctorId]
  );
}

export default {
  getAllDoctors,
  getDoctorById,
  getAllDoctorSchedules,
};
