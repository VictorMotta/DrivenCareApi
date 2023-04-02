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

export default {
  conflictError,
  duplicatedEmailError,
  doctorWithoutCrm,
  duplicatedCpfError,
  duplicatedCrmError,
};
