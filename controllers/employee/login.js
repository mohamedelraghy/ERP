const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { validateLoginEmp } = require('../../validation/employee');
const sharedEmp = require('../shared/employee');
const catchError = require('../shared/catchError');
const validate = require('../shared/dataValidation.js');

module.exports = async(req, res, next) => {

  validate(validateLoginEmp, req.body, next);

  const email = req.body.email;
  const password = req.body.password;
  
  try {

    const employee = await sharedEmp.findEmpByEmail(email);

    sharedEmp.employeeNotFound(employee);
  
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
    catchError(err, next);
  }
}