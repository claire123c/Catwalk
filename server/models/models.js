const pool = require('../../db/index.js');

module.exports = {
  getAllProducts: (page = 1, count = 5, callback) => {
    const query = `SELECT * FROM products ORDER BY id LIMIT $1 OFFSET $2`;
    const offset = (page - 1) * count;
    if (count > 1000) {
      callback('Exceeded 1000 count');
    } else {
      pool.query(query, [count, offset], (err, data) => {
        if (err) {
          callback(err);
        } else {
          callback(null, data.rows);
        }
      });
    }
  },
  getOneProduct: (id, callback) => {
    const query = `
    SELECT products.id, products.name, products.slogan, products.description, products.category, products.default_price, json_agg(json_build_object('feature', features.feature, 'value', features.value))AS features
      FROM features
      INNER JOIN products ON features.product_id = products.id WHERE products.id = $1 GROUP BY products.id;`;

    pool.query(query, [id])
      .then((data) => {
        callback(null, data.rows)
      })
      .catch((err) => {
        callback(err);
      })
  },
  getStyles: (id, callback) => {
    const query = `
    SELECT styles.product_id,
      (SELECT json_agg(json_build_object('style_id', styles.id, 'name', styles.name, 'original_price', styles.original_price, 'sale_price', styles.sale_price, 'default?', styles."default?", 'photos',
        (SELECT json_agg(json_build_object('thumbnail_url', photos.thumbnail_url, 'url', photos.url))
          FROM photos WHERE photos.styles_id = styles.id),
        'skus',
        (SELECT json_object_agg(skus.id, json_build_object('quantity', skus.quantity, 'size', skus.size))
          FROM skus WHERE skus.styles_id = styles.id)))
        FROM styles WHERE styles.product_id = $1) AS results
      FROM styles
      WHERE styles.product_id = $1 LIMIT 1;`

    pool.query(query, [id])
      .then((styleData) => {
        callback(null, styleData.rows);
      })
      .catch((err) => {
        callback(err);
      })
  },
  getRelatedProducts: (id, callback) => {
    const query = `SELECT json_agg(related_product_id) AS r FROM related WHERE related.current_product_id = $1`;

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