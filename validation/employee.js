const Joi = require('joi');

const validateEmployee = employee => {
  const schema = Joi.object({
    name: Joi.string().min(5).max(30).required(),
    email: Joi.string().min(5).max(255).email().required(),
    password: Joi.string().min(8).max(255).required(),
    role: Joi.string().valid('super_admin', 'hr', 'developer').required(),
    salary: Joi.number().positive().default(0),
  });
  return schema.validate(employee); 
}

module.exports = validateEmployee;