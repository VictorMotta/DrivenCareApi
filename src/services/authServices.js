import bcrypt from 'bcrypt';
import authRepositories from '../repositories/authRepositories.js';
import errors from '../errors/index.js';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

async function signUp({
  name,
  email,
  password,
  telephone,
  address,
  city,
  state,
  house_number,
  is_doctor,
  cpf,
  crm,
}) {
  const { rowCount: rowCountEmail } = await authRepositories.findByEmail({ email });
  if (rowCountEmail) throw errors.duplicatedEmailError();

  const { rowCount: rowCountCpf } = await authRepositories.findByCpf({ cpf });
  if (rowCountCpf) throw errors.duplicatedCpfError();

  if (is_doctor && !crm) throw errors.doctorWithoutCrm();

  if (is_doctor && crm) {
    const { rowCount: rowCountCrm } = await authRepositories.findByCrm({ crm });
    if (rowCountCrm) throw errors.duplicatedCrmError();
  }

  if (!is_doctor && crm) throw errors.conflictError('Patient does not have CRM!');

  const hashPassword = await bcrypt.hash(password, 10);

  return await authRepositories.signUp({
    name,
    email,
    password: hashPassword,
    telephone,
    address,
    city,
    state,
    house_number,
    is_doctor,
    cpf,
    crm: !crm ? null : crm,
  });
}

async function signIn({ email, password }) {
  const {
    rowCount,
    rows: [user],
  } = await authRepositories.findByEmail({ email });
  if (!rowCount) throw errors.invalidCredentialsError();

  const validatePassword = await bcrypt.compare(password, user.password);
  if (!validatePassword) throw errors.invalidCredentialsError();

  const token = jwt.sign({ userId: user.id }, process.env.SECRET_JWT);

  return token;
}

export default {
  signUp,
  signIn,
};
