const models = require('../models/models.js')

module.exports = {
  getProducts: (req, res) => {
    console.log(req.query);
    const { page, count } = req.query;
    console.log(page, count);
    models.getAllProducts(page, count,(err, data) => {
      if (err) {
        res.status(404).send(err);
      } else {
        res.status(200).send(data);
      }
    })
  }
}