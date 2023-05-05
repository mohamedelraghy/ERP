const Joi = require('joi');

const validateTask = task => {
  const schema = Joi.object({
    title: Joi.string().min(5).max(30).required(),
    description: Joi.string().min(20).required(),
    status: Joi.string().valid('pending', 'in_progress', 'completed').default('pending').required(),
    salary: Joi.number().positive().required()
  });
  return schema.validate(task); 
}

const validateStatus = task => {
  const schema = Joi.object({
    status: Joi.string().valid('pending', 'in_progress', 'completed').default('pending').required(),
  });
  return schema.validate(task); 
}

exports.validate = validateTask;
exports.validateStatus = validateStatus;