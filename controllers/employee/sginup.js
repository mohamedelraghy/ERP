const { PrismaClient } = require('@prisma/client')
const _ = require('lodash');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient()
const { validateEmp } = require('../../validation/employee');
const checkRole = require('../shared/checkRole');
const sharedEmp = require('../shared/employee');
const catchError = require('../shared/catchError');
const validate = require('../shared/dataValidation.js');

module.exports = async (req, res, next) => {

  validate(validateEmp, req.body, next);
  checkRole(req.empRole, next);

  try {

    let employee = await sharedEmp.findEmpByEmail(req.body.email);

    sharedEmp.employeeFound(employee);
  
    if (req.body.password !== req.body.confirm_password) {
      const error = new Error("password doesn't match");
      error.statusCode = 400;
      throw error;
    } 
  
    const salt = await bcrypt.genSalt(10);
    let password = req.body.password;
    password = await bcrypt.hash(password, salt);

    const profilePic = req.body.profilePic || 'https://profile-pic.me';
    const date = req.body.birthDate;

    const data = {
      ..._.pick(req.body, ['name', 'email', 'role', 'salary', 'profilePic']),
      password: password,
      birthDate: new Date(date.year, date.month - 1, date.day)
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
      },
      by: {
        empId: req.empId,
        role: req.empRole
      }
    });

  } catch (err) {
    catchError(err, next);
  }
}