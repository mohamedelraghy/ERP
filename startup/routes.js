const employee = require('../routes/employee');
const task = require('../routes/task');
const history = require('../routes/salaryHistory');

module.exports = app => {
  app.use('/api/employee', employee);
  app.use('/api/task', task);
  app.use('/api/history', history);
}