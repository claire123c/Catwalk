const mongoose = require('mongoose');
const { Schema } = mongoose;

const productSchema = new Schema({
  product_id:  {
    type: Number,
    unique: true,
  },
  name: String,
  slogan: String,
  description: String,
  category: String,
  default_price: String,
  features: [{
    feature: String,
    value: String,
  }],
  related: Array,
});

const styleSchema = new Schema({
  style_id:  {
    type: Number,
    unique: true,
  },
  name: String,
  original_price: String,
  sale_price: String,
  'default?': Boolean,
  photos: [{
    thumbnail_url: String,
    url: String,
  }],
});

const skuSchema = new Schema({
  sku_id:  {
    type: Number,
    unique: true,
  },
  product_id: Number,
  quantity: Number,
  size: String,
})