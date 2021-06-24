const pool = require('../../db/index.js');

module.exports = {
  getAllProducts: (page = 1, count = 5, callback) => {
    const query = 'SELECT * FROM products LIMIT $1'
    pool.query(query, [count], (err, data) => {
      if (err) {
        callback(err);
      } else {
        callback(null, data.rows);
      }
    });
  },

  getOneProduct: (id, callback) => {
    //WHERE products.id = $1'
    // 'SELECT * FROM features INNER JOIN products ON products.id = features.product_id WHERE products.id = $1'
    const query = 'SELECT * FROM features INNER JOIN products ON products.id = features.product_id WHERE products.id = $1'

    pool.query(query, [id], (err, data) => {
      if (err) {
        console.log(err);
        callback(err);
      } else {
        console.log(data);
        callback(null, data.rows);
      }
    });
  },
  getOneProductTest: (id, callback) => {
    //WHERE products.id = $1'
    // 'SELECT * FROM features INNER JOIN products ON products.id = features.product_id WHERE products.id = $1'
    const query = 'SELECT * FROM products WHERE products.id = $1';
    const query2 = 'SELECT feature, value FROM features WHERE product_id = $1';

    pool.query(query, [id], (err, data) => {
      if (err) {
        console.log(err);
      } else {
        pool.query(query2, [id], (err, data2) => {
          if (err) {
            callback(err);
          } else {
            callback(null, data.rows, data2.rows);
          }
        })
      }
    });
  }
}