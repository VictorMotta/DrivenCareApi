function conflictError(message) {
  return {
    name: 'ConflictError',
    message,
  };
}

function duplicatedEmailError() {
  return {
    name: 'DuplicatedEmailError',
    message: 'There is already an user with given email',
  };
}

function duplicatedCpfError() {
  return {
    name: 'DuplicatedCpfError',
    message: 'There is already an user with given cpf',
  };
}

function duplicatedCrmError() {
  return {
    name: 'DuplicatedCrmError',
    message: 'There is already an user with given crm',
  };
}

function doctorWithoutCrm() {
  return {
    name: 'DoctorWithoutCrm',
    message: 'Doctor need to have crm',
  };
}

function invalidCredentialsError() {
  return {
    name: 'InvalidCredentialsError',
    message: 'Email or password are incorrect',
  };
}

function unauthorizedError() {
  return {
    name: 'UnauthorizedError',
    message: 'You must be signed in to continue',
  };
}

function doctorExceededSpecialtyLimitError() {
  return {
    name: 'DoctorExceededSpecialtyLimitError',
    message: 'According to Decree Law 4.113/42, a doctor cannot have more than two specialties.',
  };
}

function equalSpecialtiesError() {
  return {
    name: 'EqualSpecialtiesError',
    message: 'You cannot put two equal specialties.',
  };
}

export default {
  conflictError,
  duplicatedEmailError,
  doctorWithoutCrm,
  duplicatedCpfError,
  duplicatedCrmError,
  invalidCredentialsError,
  unauthorizedError,
  doctorExceededSpecialtyLimitError,
  equalSpecialtiesError,
};
