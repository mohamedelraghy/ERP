module.exports = (empRole, next) => {
  if (empRole === 'developer') {
    const error = new Error('Not Authorized');
    error.statusCode = 401;
    return next(error)
  }
} 
