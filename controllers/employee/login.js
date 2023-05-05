const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const prisma = new PrismaClient()
const { validateLoginEmp } = require('../../validation/employee');

module.exports = async(req, res, next) => {
  const { error } = validateLoginEmp(req.body);
  if (error) {
    const err = new Error(error.details[0].message);
    error.statusCode = 422;
    return next(err);
  }

  const email = req.body.email;
  const password = req.body.password;
  
  try {

    const employee = await prisma.employee.findUnique({
      where: {
        email: email
      }
    });

    if (!employee) {
      const error = new Error('Employee with this email could not be found.');
      error.statusCode = 401;
      throw error;
    }
  
    const isEqual = await bcrypt.compare(password, employee.password);
    if (!isEqual) {
      const error = new Error('Invalid email or password');
      error.statusCode = 401;
      throw error;
    }
    
    const token = jwt.sign({
        email: employee.email,
        empId: employee.id.toString(),
        empRole: employee.role
      },
      process.env.JWT_KEY,
      { expiresIn: '1h' }
    );
  
    res.status(200).json({
      message: "Empolyee logedIn",
      token: token,
      employee: {
        id: employee.id,
        name: employee.name
      }
    });
  } catch (err) {
    if(!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
}