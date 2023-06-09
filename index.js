const express = require('express');
const app = express();

require('./startup/middleware')(app);   //* calling some Middleware 
require('./startup/routes')(app);       //* API routes
require('./startup/errorHandler')(app); //* Error handler

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});

module.exports = app;