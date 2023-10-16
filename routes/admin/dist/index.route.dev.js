"use strict";

var systemConfig = require("../../config/system");

var dashboardRoutes = require("./dashboard.route");

var productRoutes = require("./product.route");

var productCategoryRoutes = require("./product-category.route");

var roleRoutes = require("./role.route");

var accountRoutes = require("./account.route");

var authRoute = require("./auth.route");

module.exports = function (app) {
  var PATH_ADMIN = systemConfig.prefixAdmin;
  app.use(PATH_ADMIN + "/dashboard", dashboardRoutes);
  app.use(PATH_ADMIN + "/products", productRoutes);
  app.use(PATH_ADMIN + "/products-category", productCategoryRoutes);
  app.use(PATH_ADMIN + "/roles", roleRoutes);
  app.use(PATH_ADMIN + "/accounts", accountRoutes);
  app.use(PATH_ADMIN + "/auth", authRoute);
};