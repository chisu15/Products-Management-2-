"use strict";

var mongoose = require("mongoose");

var slug = require("mongoose-slug-updater");

mongoose.plugin(slug);
var productSchema = new mongoose.Schema({
  title: String,
  product_category_id: {
    type: String,
    "default": ""
  },
  description: String,
  price: Number,
  discountPercentage: Number,
  stock: Number,
  thumbnail: String,
  status: String,
  position: Number,
  slug: {
    type: String,
    slug: "title",
    unique: true
  },
  deleted: {
    type: Boolean,
    "default": false
  },
  deletedAt: Date
}, {
  timestamps: true
});
var Product = mongoose.model("Product", productSchema, "products");
module.exports = Product;