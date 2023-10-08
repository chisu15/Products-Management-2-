"use strict";

var mongoose = require("mongoose");

var slug = require("mongoose-slug-updater");

mongoose.plugin(slug);
var productCategorySchema = new mongoose.Schema({
  title: String,
  parent_id: {
    type: String,
    "default": ""
  },
  description: String,
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
var ProductCategory = mongoose.model("ProductCategory", productCategorySchema, "products-category");
module.exports = ProductCategory;