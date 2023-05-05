const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

module.exports = async (req, res, next) => {
  
  if (req.empRole === 'developer') {
    const error = new Error('Not Authorized');
    error.statusCode = 401;
    return next(error)
  }

  try {

    let employee = await prisma.employee.findFirst({
      where: {
        id: Number(req.params.id),
      },
    });

    if (!employee) {
      const error = new Error('Employee with this email could not be found.');
      error.statusCode = 404;
      throw error;
    }
    
    const tasks = await prisma.task.findMany({
      where: {
        employeeId: employee.id,
        status: 'completed'
      }
    });

    if (!tasks.length) {
      const error = new Error('No task completed');
      error.statusCode = 404;
      throw error;
    }
  
    let total = 0;
    tasks.forEach(task => {
      total += task.salary;
    });

    const updatedEmp = await prisma.employee.update({
      where: {
        email: employee.email
      },
      data: {
        salary: total
      }
    });
    
    res.status(200).json({ 
      message: "adding salary for completed task",
      employee: {
        id: updatedEmp._id,
        name: updatedEmp.name,
        email: updatedEmp.email,
        role: updatedEmp.role,
        salary: updatedEmp.salary
      },
      by: {
        empId: req.empId,
        role: req.empRole
      }
    });

  } catch (err) {
    if (!err.status) {
      err.status = 500;
    }
    next(err);
  }
}