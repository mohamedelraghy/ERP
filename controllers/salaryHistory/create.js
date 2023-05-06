const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const checkRole = require('../shared/checkRole');
const sharedEmp = require('../shared/employee');
const catchError = require('../shared/catchError');


module.exports = async(req, res, next) => {
  
  checkRole(req.empRole, next);

  try {

    const employee = await sharedEmp.findEmpById(req.params.id);
  
    sharedEmp.employeeNotFound(employee);

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
    catchError(error, next);
  }
}