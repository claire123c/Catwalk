const router = require('express').Router();
const controllers = require('./controllers/controllers.js')

router.get('/:product_id/related', controllers.getRelated);
router.get('/:product_id', controllers.getProduct);
router.get('/*', controllers.getProducts);

module.exports = router;