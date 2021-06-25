const pool = require('../../db/index.js');

module.exports = {
  getAllProducts: (page = 1, count = 5, callback) => {
    const query = `SELECT * FROM products ORDER BY id LIMIT $1 OFFSET $2`;
    const offset = (page - 1) * count;
    //should I limit the count?

    pool.query(query, [count, offset], (err, data) => {
      if (err) {
        callback(err);
      } else {
        callback(null, data.rows);
      }
    });
  },
  getOneProductV2: (id, callback) => {
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
  getOneProduct: (id, callback) => {
    const query = `SELECT products.id, products.name, products.slogan, products.description, products.category, products.default_price, json_agg(json_build_object('feature', features.feature, 'value', features.value)) AS features FROM features INNER JOIN products ON features.product_id = products.id
    WHERE products.id = $1 GROUP BY products.id;`;

    pool.query(query, [id])
      .then((data) => {
        console.log(data.rows);
        callback(null, data.rows)
      })
      .catch((err) => {
        console.log(err);
        callback(err);
      })
  },
  getStyles: (id, callback) => {
    const query = `SELECT product_id, json_agg(json_build_object('style_id', styles.id, 'name', styles.name, 'original_price', styles.original_price, 'sale_price', styles.sale_price, 'default?', styles."default?")) AS results FROM styles WHERE product_id = $1 GROUP BY product_id`;

    pool.query(query, [id])
      .then((styleData) => {
        callback(null, styleData.rows);
      })
      .catch((err) => {
        console.log(err);
        callback(err);
      })
  },
  getRelatedProducts: (id, callback) => {
    const query = `SELECT related_product_id FROM related WHERE related.current_product_id = $1`;

    pool.query(query, [id])
      .then((relatedData) => {
        callback(null, relatedData.rows);
      })
      .catch((err) => {
        callback(err);
      })
  },
  flatten: (arrOfObjs) => {
    let result = [];
    if (!Array.isArray(arrOfObjs)) {
      return;
    }
    for (var i = 0; i < arrOfObjs.length; i++) {
      for (var key in arrOfObjs[i]) {
        result.push(arrOfObjs[i][key]);
      }
    }
    return result;
  }
}