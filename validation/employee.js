const Joi = require('joi');

const validateEmployee = employee => {
  const schema = Joi.object({
    name: Joi.string().min(5).max(30).required(),
    email: Joi.string().min(5).max(255).email().required(),
    password: Joi.string().min(8).max(255).required(),
    confirm_password: Joi.string().min(8).max(255).required(),
    role: Joi.string().valid('super_admin', 'hr', 'developer').required(),
    salary: Joi.number().positive().default(0).optional(),
    profilePic: Joi.string().min(13),
    birthDate: Joi.object({
      day: Joi.number().positive().required(),
      month: Joi.number().positive().required(),
      year: Joi.number().positive().required()
    }).required()
  });
  return schema.validate(employee); 
}

const validateLoginEmployee = employee => {
  const schema = Joi.object({
    email: Joi.string().min(5).max(255).email().required(),
    password: Joi.string().min(8).max(255).required(),
  });
  return schema.validate(employee); 
}

exports.validateEmp = validateEmployee;
exports.validateLoginEmp = validateLoginEmployee;