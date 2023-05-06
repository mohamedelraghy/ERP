const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const checkRole = require('../shared/checkRole');
const sharedEmp = require('../shared/employee');
const catchError = require('../shared/catchError');

module.exports = async (req, res, next) => {
  
  checkRole(req.empRole, next);

  try {
    let employee = await sharedEmp.findEmpById(req.params.id);
    
    sharedEmp.employeeNotFound(employee);
    
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
    catchError(err, next);
  }
}