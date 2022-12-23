export const BadRequestException = (message) => {
  let error = new Error(message);
  error.statusCode = 400;

  return error;
};

export const NotFoundException = (message) => {
  let error = new Error(message);
  error.statusCode = 404;

  return error;
};
