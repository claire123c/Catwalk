const models = require('../models/models.js')

module.exports = {
  getProducts: (req, res) => {
    const { page, count } = req.query;

    if (count > 1000) {
      res.status(404).send('Count exceeded 1000');
    } else {
      models.getAllProducts(page, count)
        .then((data) => {
          res.status(200).send(data.rows);
        })
        .catch((err) => {
          res.status(404).send(err);
        })
    }
  },
  getProduct: (req, res) => {
    const { product_id } = req.params;

    models.getOneProduct(product_id)
      .then((data) => {
        res.status(200).send(data.rows);
      })
      .catch((err) => {
        res.status(404).send(err);
      })
  },
  getProductStyles: (req, res) => {
    const { product_id } = req.params;

    models.getStyles(product_id)
      .then((styleData) => {
        res.status(200).send(styleData.rows[0]);
      })
      .catch((err) => {
          res.status(404).send(err);
      })
  },
  getRelated: (req, res) => {
    const { product_id } = req.params;

    models.getRelatedProducts(product_id)
      .then((relatedData) => {
        res.status(200).send(models.flatten(relatedData.rows)[0]);
      })
      .catch((err) => {
        res.status(404).send(err);
      })
    }
}