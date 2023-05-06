const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

module.exports = async(req, res, next) => {
  
  if (req.empRole === 'developer') {
    const error = new Error('Not Authorized');
    error.statusCode = 401;
    return next(error)
  }

  try {

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

    const salary = employee.salary; 
    if (salary === 0) {
      const error = new Error('Employee have no salary');
      error.statusCode = 400;
      throw error;
    }

    const payTime = new Date();
    const salHistory = await prisma.salaryHistory.create({
      data: {
        employeeId: Number(employee.id),
        month: payTime.getMonth() + 1,
        year: payTime.getFullYear(),
        salaryTaken: salary
      }
    });

    await prisma.employee.update({
      where: {
        email: employee.email
      },
      data: {
        salary: 0
      }
    });

    res.status(201).json({
      message: "salary History Added",
      salaryHistory: salHistory,
      by: {
        id: req.empId,
        role: req.empRole
      }
    })

  } catch (error) {
    if(!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
}