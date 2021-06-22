const express = require('express');
const path = require('path');
const db = require('../db/index.js');

const app = express();

app.listen(port, () => {
  console.log(`Server listening on port ${3000}`);
});
