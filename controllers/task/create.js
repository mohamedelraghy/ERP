const { PrismaClient } = require('@prisma/client');
const _ = require("lodash");

const prisma = new PrismaClient();
const { validate } = require('../../validation/tasks');
const checkRole = require('../shared/checkRole');
const sharedEmp = require('../shared/employee');
const catchError = require('../shared/catchError');
const validateTask = require('../shared/dataValidation.js');


module.exports = async (req, res, next) => {
  validateTask(validate, req.body, next);
  
  checkRole(req.empRole, next);
  
  try {
    //* find emp to assign to task
    const employee = await sharedEmp.findEmpById(req.params.id);

    sharedEmp.employeeNotFound(employee);

    const date = req.body.deadLine;
    const data = {
      ..._.pick(req.body, [ 'title', 'description', 'status', 'salary']),
      employeeId: employee.id,
      deadLine: new Date(date.year, date.month - 1, date.day)
    }
    const task = await prisma.task.create({
      data: data
    });

    res.status(201).json({
      message: "Task Created",
      assignedTo: employee.name,
      empRole: employee.role
    });

  } catch(error) {
    catchError(error, next);
  } 
  
}