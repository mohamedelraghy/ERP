const employee = require('../routes/employee');
const task = require('../routes/task');

module.exports = app => {
  app.use('/api/employee', employee);
  app.use('/api/task', task);
}