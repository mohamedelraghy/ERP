const { PrismaClient } = require('@prisma/client');
const _ = require("lodash");

const prisma = new PrismaClient();
const { validate } = require('../../validation/tasks');

module.exports = async (req, res, next) => {
  const { error } = validate(req.body);
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
    //* find emp to assign to task
    const employee = await prisma.employee.findFirst({
      where: {
        id: Number(req.params.id)
      }
    });

    if (!employee) {
      const error = new Error('Employee with this email could not be found.');
      error.statusCode = 404;
      throw error;
    }

    const data = {
      ..._.pick(req.body, [ 'title', 'description', 'status', 'salary']),
      employeeId: employee.id
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
    if(!error.statusCode) {
      error.statusCode = 500;
    }
    next(error)
  } 
  
}