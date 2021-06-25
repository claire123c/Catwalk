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

    models.getOneProduct(product_id, (err, data) => {
      if (err) {
        res.status(404).send(err);
      } else {
        res.status(200).send(data);
      }
    })
  },
  getProductV2: (req, res) => {
    const { product_id } = req.params;

    models.getOneProductV2(product_id, (err, productData, featureData) => {
      if (err) {
        res.status(404).send(err);
      } else {
        productData[0].feature = featureData;
        res.status(200).send(productData);
      }
    })
  },
  getRelated: (req, res) => {
    const { product_id } = req.params;

    models.getRelatedProducts(product_id, (err, relatedData) => {
      if (err) {
        res.status(404).send(err);
      } else {
        res.status(200).send(models.flatten(relatedData));
      }
    })
  }
}