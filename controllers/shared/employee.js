const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

exports.employeeNotFound = (employee) => {
  if (!employee) {
    const error = new Error('Employee with this email could not be found.');
    error.statusCode = 404;
    throw error;
  }
}

exports.employeeFound = (employee) => {
  if (employee) {
    const error = new Error('Employee Already registered')
    error.statusCode = 400;
    throw error;
  }
}

exports.findEmpById = async (id) => {
  const emp = await prisma.employee.findFirst({
    where: {
      id: Number(id),
    },
  });
  return emp;
}

exports.findEmpByEmail = async (email) => {
  const emp = await prisma.employee.findUnique({
    where: {
      email: email
    }
  });
  return emp;
}