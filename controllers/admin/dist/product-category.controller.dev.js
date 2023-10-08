"use strict";

var ProductCategory = require("../../models/product-category.model");

var systemConfig = require("../../config/system");

var createTreeHelper = require("../../helpers/createTree"); // [GET] /admin/products-category


module.exports.index = function _callee(req, res) {
  var find, records, newRecords;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          find = {
            deleted: false
          };
          _context.next = 3;
          return regeneratorRuntime.awrap(ProductCategory.find(find));

        case 3:
          records = _context.sent;
          newRecords = createTreeHelper.tree(records);
          res.render("admin/pages/products-category/index", {
            pageTitle: "Danh mục sản phẩm",
            records: newRecords
          });

        case 6:
        case "end":
          return _context.stop();
      }
    }
  });
}; // [GET] /admin/products-category/create


module.exports.create = function _callee2(req, res) {
  var find, records, newRecords;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          find = {
            deleted: false
          };
          _context2.next = 3;
          return regeneratorRuntime.awrap(ProductCategory.find(find));

        case 3:
          records = _context2.sent;
          newRecords = createTreeHelper.tree(records);
          res.render("admin/pages/products-category/create", {
            pageTitle: "Tạo danh mục sản phẩm",
            records: newRecords
          });

        case 6:
        case "end":
          return _context2.stop();
      }
    }
  });
}; // [POST] /admin/products-category/create


module.exports.createPost = function _callee3(req, res) {
  var count, record;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          if (!(req.body.position == "")) {
            _context3.next = 7;
            break;
          }

          _context3.next = 3;
          return regeneratorRuntime.awrap(ProductCategory.count());

        case 3:
          count = _context3.sent;
          req.body.position = count + 1;
          _context3.next = 8;
          break;

        case 7:
          req.body.position = parseInt(req.body.position);

        case 8:
          record = new ProductCategory(req.body);
          _context3.next = 11;
          return regeneratorRuntime.awrap(record.save());

        case 11:
          res.redirect("".concat(systemConfig.prefixAdmin, "/products-category"));

        case 12:
        case "end":
          return _context3.stop();
      }
    }
  });
};