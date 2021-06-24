const pool = require('../../db/index.js');

module.exports = {
  getAllProducts: (page = 1, count = 5, callback) => {
    const query = 'SELECT * from products LIMIT $1'
    pool.query(query, [count], (err, data) => {
      if (err) {
        callback(err);
      } else {
        callback(null, data.rows);
      }
    });
  },

  getOneProduct: (id, callback) => {
    const query = 'SELECT * from products WHERE id = $1'
    pool.query(query, [id], (err, data) => {
      if (err) {
        callback(err);
      } else {
        callback(null, data.rows);
      }
    });
  }
}