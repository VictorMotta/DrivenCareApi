import connectionDb from '../config/database.js';

async function findByEmail({ email }) {
  return await connectionDb.query(
    `
    SELECT * FROM users WHERE email = $1
  `,
    [email]
  );
}

async function findByCpf({ cpf }) {
  return await connectionDb.query(
    `
    SELECT * FROM users WHERE cpf = $1
  `,
    [cpf]
  );
}

async function findByCrm({ crm }) {
  return await connectionDb.query(
    `
    SELECT * FROM users WHERE crm = $1
  `,
    [crm]
  );
}

async function signUp({ name, email, password, telephone, is_doctor, cpf, crm }) {
  return await connectionDb.query(
    `
    INSERT INTO users 
    (name, email,password,telephone, is_doctor, cpf,crm)
    VALUES
    ($1,$2,$3,$4,$5,$6,$7)
  `,
    [name, email, password, telephone, is_doctor, cpf, crm]
  );
}

async function findById(id) {
  return await connectionDb.query(
    `
    SELECT 
    id,name, email, cpf, telephone, crm, is_doctor
    FROM users 
    WHERE id = $1;
  `,
    [id]
  );
}

export default {
  signUp,
  findByEmail,
  findByCpf,
  findByCrm,
  findById,
};
