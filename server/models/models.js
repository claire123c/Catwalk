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
    // const query = 'SELECT * FROM products INNER JOIN features ON products.id = features.product_id WHERE products.id = $1'
    // SELECT * FROM products WHERE products.id = $1 UNION SELECT feature, value FROM features WHERE product_id = $1
    const query = 'SELECT * FROM features INNER JOIN products ON products.id = features.product_id WHERE products.id = $1'
    pool.query(query, [id], (err, data) => {
      if (err) {
        console.log(err);
        callback(err);
      } else {
        callback(null, data.rows);
      }
    });
  }
}