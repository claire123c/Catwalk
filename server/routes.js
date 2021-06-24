const router = require('express').Router();
const controllers = require('./controllers/controllers.js')

router.get('/*', controllers.getProducts);

module.exports = router;