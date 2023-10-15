"use strict";

var mongoose = require("mongoose");

var generate = require("../helpers/generate");

var accountSchema = new mongoose.Schema({
  fullName: String,
  email: String,
  password: String,
  token: {
    type: String,
    "default": generate.generateRandomString(20)
  },
  phone: String,
  avatar: String,
  role_id: String,
  status: String,
  deleted: {
    type: Boolean,
    "default": false
  },
  deletedAt: Date
}, {
  timestamps: true
});
var Account = mongoose.model("Account", accountSchema, "accounts");
module.exports = Account;