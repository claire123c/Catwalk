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
    console.log(product_id);
    models.getOneProductTest(product_id, (err, data, data2) => {
      if (err) {
        res.status(404).send(err);
      } else {
        console.log(data)
        console.log(data2)
        const copy = data2;
        data[0].feature = copy;
        res.status(200).send(data);
      }
    })
  }
}