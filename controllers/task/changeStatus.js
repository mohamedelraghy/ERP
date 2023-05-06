const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()
const { validateStatus } = require('../../validation/tasks');

module.exports = async (req, res, next) => {
  
  const { error } = validateStatus(req.body);
  if (error) {
    const err = new Error(error.details[0].message);
    error.statusCode = 422;
    return next(err);
  }

  try {    
    const task = await prisma.task.findFirst({
      where: {
        id: Number(req.params.id),
        employeeId: Number(req.empId)
      }
    });

    if (!task) {
      const error = new Error('No task found');
      error.statusCode = 404;
      throw error;
    }

    if(task.status === req.body.status) {
      const error = new Error(`status already ${req.body.status}`);
      error.status = 400;
      throw error;
    }
    
    const data = {
      status: req.body.status
    }
  
    if (req.body.status === 'completed') {
      data.finishedAt = new Date();
    }

    const updatedTask = await prisma.task.update({
      where: {
        id: task.id
      },
      data: data
    });
      
    res.status(200).json({ 
      message: "tasks status updated",
      tasks: updatedTask
    });

  } catch (err) {
    if (!err.status) {
      err.status = 500;
    }
    next(err);
  }
}