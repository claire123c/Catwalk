const express = require('express');
const path = require('path');
const db = require('../db/index.js');
const port = 3000;
const router = require('./routes.js');

const app = express();

app.use('/', router);
app.listen(port, () => {
  console.log(`Server listening on port ${3000}`);
});
