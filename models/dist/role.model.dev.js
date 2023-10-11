"use strict";

var mongoose = require("mongoose");

var roleSchema = new mongoose.Schema({
  title: String,
  description: String,
  permissions: {
    type: Array,
    "default": []
  },
  deleted: {
    type: Boolean,
    "default": false
  },
  deletedAt: Date
}, {
  timestamps: true
});
var Role = mongoose.model("Role", roleSchema, "roles");
module.exports = Role;