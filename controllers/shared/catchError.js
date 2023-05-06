module.exports = (err, next) => {
  if (!err.status) {
    err.status = 500;
  }
  next(err);
}