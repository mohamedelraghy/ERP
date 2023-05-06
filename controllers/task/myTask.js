const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()
const catchError = require('../shared/catchError');


module.exports = async (req, res, next) => {
  
  try {    
    const tasks = await prisma.task.findMany({
      where: {
        employeeId: Number(req.empId),
      }
    });

    if (!tasks.length) {
      const error = new Error('No task found');
      error.statusCode = 404;
      throw error;
    }
      
    res.status(200).json({ 
      message: "tasks retrieved",
      tasks: tasks
    });

  } catch (err) {
    catchError(err, next);
  }
}