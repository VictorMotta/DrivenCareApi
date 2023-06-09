import httpStatus from 'http-status';

export default function handleApplicationErrors(err, req, res, next) {
  if (
    err.name === 'ConflictError' ||
    err.name === 'DuplicatedEmailError' ||
    err.name === 'DuplicatedCpfError' ||
    err.name === 'DuplicatedCrmError'
  ) {
    return res.status(httpStatus.CONFLICT).send({ message: err.message });
  }

  if (err.name === 'NotFoundError' || err.name === 'NotFoundMessageError') {
    return res.status(httpStatus.NOT_FOUND).send({ message: err.message });
  }

  if (err.name === 'DoctorWithoutCrm') {
    return res.status(httpStatus.UNPROCESSABLE_ENTITY).send({ message: err.message });
  }

  if (
    err.name === 'UnauthorizedError' ||
    err.name === 'InvalidCredentialsError' ||
    err.name === 'DoctorExceededSpecialtyLimitError' ||
    err.name === 'EqualSpecialtiesError' ||
    err.name === 'UnauthorizedMessageError'
  ) {
    return res.status(httpStatus.UNAUTHORIZED).send({ message: err.message });
  }

  return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
    error: 'InternalServerError',
    message: 'Internal Server Error',
  });
}
