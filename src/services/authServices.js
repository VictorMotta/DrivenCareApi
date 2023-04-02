import bcrypt from 'bcrypt';
import authRepositories from '../repositories/authRepositories.js';
import errors from '../errors/index.js';

async function signUp({ name, email, password, telephone, is_doctor, cpf, crm }) {
  const { rowCount: rowCountEmail } = await authRepositories.findByEmail({ email });
  if (rowCountEmail) throw errors.duplicatedEmailError();

  const { rowCount: rowCountCpf } = await authRepositories.findByCpf({ cpf });
  if (rowCountCpf) throw errors.duplicatedCpfError();

  if (is_doctor && !crm) throw errors.doctorWithoutCrm();

  if (is_doctor && crm) {
    const { rowCount: rowCountCrm } = await authRepositories.findByCrm({ crm });
    if (rowCountCrm) throw errors.duplicatedCrmError();
  }

  const hashPassword = await bcrypt.hash(password, 10);

  return await authRepositories.signUp({
    name,
    email,
    password: hashPassword,
    telephone,
    is_doctor,
    cpf,
    crm: !crm ? null : crm,
  });
}

export default {
  signUp,
};
