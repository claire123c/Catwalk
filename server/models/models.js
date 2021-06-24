const pool = require('../../db/index.js');

module.exports = {
  getAllProducts: (page = 1, count = 5, callback) => {
    const query = 'SELECT * FROM products ORDER BY id LIMIT $1 ';
    const offset = (page - 1) * count;
    console.log(offset);
    pool.query(query, [count], (err, data) => {
      if (err) {
        callback(err);
      } else {
        console.log(data.rows);
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
  }
}