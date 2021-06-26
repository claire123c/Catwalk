const path = require('path');
const db = require('../db/index.js');
const port = 3002;
const app = require('./app.js');

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

module.exports = app;
