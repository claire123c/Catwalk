const pool = require('../../db/index.js');

module.exports = {
  getAllProducts: (page = 1, count = 5, callback) => {
    const query = `SELECT * FROM products ORDER BY id LIMIT $1 OFFSET $2`;
    const offset = (page - 1) * count;

    return pool.query(query, [count, offset]);
  },
  getOneProduct: (id, callback) => {
    const query = `
    SELECT products.id, products.name, products.slogan, products.description, products.category, products.default_price, json_agg(json_build_object('feature', features.feature, 'value', features.value)) AS features
      FROM features
      INNER JOIN products ON features.product_id = products.id WHERE products.id = $1 GROUP BY products.id;`;

    return pool.query(query, [id]);

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

    return pool.query(query, [id]);

  },
  getRelatedProducts: (id, callback) => {
    const query = `SELECT json_agg(related_product_id) AS r FROM related WHERE related.current_product_id = $1`;

    return pool.query(query, [id]);

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