const express = require('express');
const path = require('path');
const db = require('../db/index.js');
const port = 3002;
const router = require('./routes.js');

const app = express();

app.use('/products', router);
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
