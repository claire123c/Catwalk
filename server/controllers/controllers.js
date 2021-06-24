const models = require('../models/models.js')

module.exports = {
  getProducts: (req, res) => {
    const { page, count } = req.query;
    models.getAllProducts(page, count,(err, data) => {
      if (err) {
        res.status(404).send(err);
      } else {
        res.status(200).send(data);
      }
    })
  },
  getProduct: (req, res) => {
    const { product_id } = req.params;

    models.getOneProduct(product_id, (err, productData, featureData) => {
      if (err) {
        res.status(404).send(err);
      } else {
        productData[0].feature = featureData;
        res.status(200).send(productData);
      }
    })
  }
}