const express = require('express');
const app = express();
const router = require('./routes.js');
const morgan = require('morgan')

app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));
app.use('/products', router);

module.exports = app;