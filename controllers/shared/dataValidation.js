module.exports = (validationFn, body, next) => {
  const { error } = validationFn(body);
  if (error) {
    const err = new Error(error.details[0].message);
    error.statusCode = 422;
    return next(err);
  }
}