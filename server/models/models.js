const pool = require('../../db/index.js');

module.exports = {
  getAllProducts: (page = 1, count = 5, callback) => {
    console.log(page, count);
    const query = 'SELECT * from products LIMIT $1'
    pool.query(query, [count], (err, data) => {
      if (err) {
        callback(err);
      } else {
        callback(null, data.rows);
      }
    });

  }
}