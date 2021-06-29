const models = require('../models/models.js')

module.exports = {
  getProducts: (req, res) => {
    const { page, count } = req.query;

    if (count > 1000) {
      res.status(404).send('Count exceeded 1000');
    } else {
      models.getAllProducts(page, count, (err, data) => {
        if (err) {
          res.status(404).send(err);
        } else {
          res.status(200).send(data);
        }
      })
    }

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
  getProductStyles: (req, res) => {
    const { product_id } = req.params;

    models.getStyles(product_id, (err, styleData) => {
      if (err) {
        res.status(404).send(err);
      } else {
        res.status(200).send(styleData[0]);
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