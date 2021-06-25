const pool = require('../../db/index.js');

module.exports = {
  getAllProducts: (page = 1, count = 5, callback) => {
    const query = 'SELECT * FROM products ORDER BY id LIMIT $1 OFFSET $2';
    const offset = (page - 1) * count;

    pool.query(query, [count, offset], (err, data) => {
      if (err) {
        callback(err);
      } else {
        callback(null, data.rows);
      }
    });
  },
  getOneProduct: (id, callback) => {
    const query1 = 'SELECT * FROM products WHERE products.id = $1';
    const query2 = 'SELECT feature, value FROM features WHERE product_id = $1';

    pool.query(query1, [id])
      .then((productData) => {
        pool.query(query2, [id])
          .then((featureData) => {
            callback(null, productData.rows, featureData.rows)
          })
      })
      .catch((err) => {
        callback(err);
      })
  },
  getRelatedProducts: (id, callback) => {
    //::json->>"
    const query = 'SELECT related_product_id FROM related WHERE related.current_product_id = $1';

    pool.query(query, [id])
      .then((relatedData) => {
        callback(null, relatedData.rows);
      })
      .catch((err) => {
        console.log(err);
        callback(err);
      })
  }
}