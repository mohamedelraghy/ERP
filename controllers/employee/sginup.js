const { PrismaClient } = require('@prisma/client')
const _ = require('lodash');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient()
const { validateEmp } = require('../../validation/employee');

module.exports = async (req, res, next) => {
  const { error } = validateEmp(req.body);
  if (error) {
    const err = new Error(error.details[0].message);
    error.statusCode = 422;
    return next(err);
  }

  if (req.empRole === 'developer') {
    const error = new Error('Not Authorized');
    error.statusCode = 401;
    return next(error)
  }

  try {

    let employee = await prisma.employee.findUnique({
      where: {
        email: req.body.email,
      },
    })

    if (employee) {
      const error = new Error('Employee Already registered')
      error.statusCode = 400;
      throw error;
    }
  
    if (req.body.password !== req.body.confirm_password) {
      const error = new Error("password doesn't match");
      error.statusCode = 400;
      throw error;
    } 
  
    const salt = await bcrypt.genSalt(10);
    let password = req.body.password;
    password = await bcrypt.hash(password, salt);

    if (!req.body.salary) req.body.salary = 0;

    const data = {
      ..._.pick(req.body, ['name', 'email', 'role', 'salary']),
      password: password
    }
  
    employee = await prisma.employee.create({
      data: data
    });
    
    res.status(201).json({ 
      message: "Employee Created",
      employee: {
        id: employee._id,
        name: employee.name,
        email: employee.email,
        role: employee.role,
        salary: employee.salary
      }
    });

  } catch (err) {
    if (!err.status) {
      err.status = 500;
    }
    next(err);
  }
}