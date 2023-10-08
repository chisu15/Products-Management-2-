"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var Product = require("../../models/product.model");

var systemConfig = require("../../config/system");

var filterStatusHelper = require("../../helpers/filterStatus");

var searchHelper = require("../../helpers/search");

var paginationHelper = require("../../helpers/pagination"); // [GET] /admin/products


module.exports.index = function _callee(req, res) {
  var filterStatus, find, objectSearch, countProducts, objectPagination, sort, products;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          filterStatus = filterStatusHelper(req.query);
          find = {
            deleted: false
          };

          if (req.query.status) {
            find.status = req.query.status;
          }

          objectSearch = searchHelper(req.query);

          if (objectSearch.regex) {
            find.title = objectSearch.regex;
          } // Pagination


          _context.next = 7;
          return regeneratorRuntime.awrap(Product.count(find));

        case 7:
          countProducts = _context.sent;
          objectPagination = paginationHelper({
            currentPage: 1,
            limitItems: 4
          }, req.query, countProducts); // End Pagination
          // Sort

          sort = {};

          if (req.query.sortKey && req.query.sortValue) {
            sort[req.query.sortKey] = req.query.sortValue;
          } else {
            sort.position = "desc";
          } // End Sort


          _context.next = 13;
          return regeneratorRuntime.awrap(Product.find(find).sort(sort).limit(objectPagination.limitItems).skip(objectPagination.skip));

        case 13:
          products = _context.sent;
          res.render("admin/pages/products/index", {
            pageTitle: "Danh sách sản phẩm",
            products: products,
            filterStatus: filterStatus,
            keyword: objectSearch.keyword,
            pagination: objectPagination
          });

        case 15:
        case "end":
          return _context.stop();
      }
    }
  });
}; // [PATCH] /admin/products/change-status/:status/:id


module.exports.changeStatus = function _callee2(req, res) {
  var status, id;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          status = req.params.status;
          id = req.params.id;
          _context2.next = 4;
          return regeneratorRuntime.awrap(Product.updateOne({
            _id: id
          }, {
            status: status
          }));

        case 4:
          req.flash("success", "Cập nhật trạng thái thành công!");
          res.redirect("back");

        case 6:
        case "end":
          return _context2.stop();
      }
    }
  });
}; // [PATCH] /admin/products/change-multi


module.exports.changeMulti = function _callee3(req, res) {
  var type, ids, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, item, _item$split, _item$split2, id, position;

  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          type = req.body.type;
          ids = req.body.ids.split(", ");
          _context3.t0 = type;
          _context3.next = _context3.t0 === "active" ? 5 : _context3.t0 === "inactive" ? 9 : _context3.t0 === "delete-all" ? 13 : _context3.t0 === "change-position" ? 17 : 47;
          break;

        case 5:
          _context3.next = 7;
          return regeneratorRuntime.awrap(Product.updateMany({
            _id: {
              $in: ids
            }
          }, {
            status: "active"
          }));

        case 7:
          req.flash("success", "C\u1EADp nh\u1EADt tr\u1EA1ng th\xE1i th\xE0nh c\xF4ng ".concat(ids.length, " s\u1EA3n ph\u1EA9m!"));
          return _context3.abrupt("break", 48);

        case 9:
          _context3.next = 11;
          return regeneratorRuntime.awrap(Product.updateMany({
            _id: {
              $in: ids
            }
          }, {
            status: "inactive"
          }));

        case 11:
          req.flash("success", "C\u1EADp nh\u1EADt tr\u1EA1ng th\xE1i th\xE0nh c\xF4ng ".concat(ids.length, " s\u1EA3n ph\u1EA9m!"));
          return _context3.abrupt("break", 48);

        case 13:
          _context3.next = 15;
          return regeneratorRuntime.awrap(Product.updateMany({
            _id: {
              $in: ids
            }
          }, {
            deleted: true,
            deletedAt: new Date()
          }));

        case 15:
          req.flash("success", "\u0110\xE3 x\xF3a th\xE0nh c\xF4ng ".concat(ids.length, " s\u1EA3n ph\u1EA9m!"));
          return _context3.abrupt("break", 48);

        case 17:
          _iteratorNormalCompletion = true;
          _didIteratorError = false;
          _iteratorError = undefined;
          _context3.prev = 20;
          _iterator = ids[Symbol.iterator]();

        case 22:
          if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
            _context3.next = 32;
            break;
          }

          item = _step.value;
          _item$split = item.split("-"), _item$split2 = _slicedToArray(_item$split, 2), id = _item$split2[0], position = _item$split2[1];
          position = parseInt(position); // console.log(id);
          // console.log(position);

          _context3.next = 28;
          return regeneratorRuntime.awrap(Product.updateOne({
            _id: id
          }, {
            position: position
          }));

        case 28:
          req.flash("success", "\u0110\xE3 \u0111\u1ED5i v\u1ECB tr\xED th\xE0nh c\xF4ng ".concat(ids.length, " s\u1EA3n ph\u1EA9m!"));

        case 29:
          _iteratorNormalCompletion = true;
          _context3.next = 22;
          break;

        case 32:
          _context3.next = 38;
          break;

        case 34:
          _context3.prev = 34;
          _context3.t1 = _context3["catch"](20);
          _didIteratorError = true;
          _iteratorError = _context3.t1;

        case 38:
          _context3.prev = 38;
          _context3.prev = 39;

          if (!_iteratorNormalCompletion && _iterator["return"] != null) {
            _iterator["return"]();
          }

        case 41:
          _context3.prev = 41;

          if (!_didIteratorError) {
            _context3.next = 44;
            break;
          }

          throw _iteratorError;

        case 44:
          return _context3.finish(41);

        case 45:
          return _context3.finish(38);

        case 46:
          return _context3.abrupt("break", 48);

        case 47:
          return _context3.abrupt("break", 48);

        case 48:
          res.redirect("back");

        case 49:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[20, 34, 38, 46], [39,, 41, 45]]);
}; // [DELETE] /admin/products/delete/:id


module.exports.deleteItem = function _callee4(req, res) {
  var id;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          id = req.params.id; // await Product.deleteOne({ _id: id });

          _context4.next = 3;
          return regeneratorRuntime.awrap(Product.updateOne({
            _id: id
          }, {
            deleted: true,
            deletedAt: new Date()
          }));

        case 3:
          req.flash("success", "\u0110\xE3 x\xF3a th\xE0nh c\xF4ng s\u1EA3n ph\u1EA9m!");
          res.redirect("back");

        case 5:
        case "end":
          return _context4.stop();
      }
    }
  });
}; // [GET] /admin/products/create


module.exports.create = function _callee5(req, res) {
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          res.render("admin/pages/products/create", {
            pageTitle: "Thêm mới sản phẩm"
          });

        case 1:
        case "end":
          return _context5.stop();
      }
    }
  });
}; // [POST] /admin/products/create


module.exports.createPost = function _callee6(req, res) {
  var countProducts, product;
  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          req.body.price = parseInt(req.body.price);
          req.body.discountPercentage = parseInt(req.body.discountPercentage);
          req.body.stock = parseInt(req.body.stock);

          if (!(req.body.position == "")) {
            _context6.next = 10;
            break;
          }

          _context6.next = 6;
          return regeneratorRuntime.awrap(Product.count());

        case 6:
          countProducts = _context6.sent;
          req.body.position = countProducts + 1;
          _context6.next = 11;
          break;

        case 10:
          req.body.position = parseInt(req.body.position);

        case 11:
          product = new Product(req.body);
          _context6.next = 14;
          return regeneratorRuntime.awrap(product.save());

        case 14:
          res.redirect("".concat(systemConfig.prefixAdmin, "/products"));

        case 15:
        case "end":
          return _context6.stop();
      }
    }
  });
}; // [GET] /admin/products/edit/:id


module.exports.edit = function _callee7(req, res) {
  var find, product;
  return regeneratorRuntime.async(function _callee7$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          find = {
            deleted: false,
            _id: req.params.id
          };
          _context7.next = 4;
          return regeneratorRuntime.awrap(Product.findOne(find));

        case 4:
          product = _context7.sent;
          res.render("admin/pages/products/edit", {
            pageTitle: "Chỉnh sửa sản phẩm",
            product: product
          });
          _context7.next = 11;
          break;

        case 8:
          _context7.prev = 8;
          _context7.t0 = _context7["catch"](0);
          res.redirect("".concat(systemConfig.prefixAdmin, "/products"));

        case 11:
        case "end":
          return _context7.stop();
      }
    }
  }, null, null, [[0, 8]]);
}; // [PATCH] /admin/products/edit/:id


module.exports.editPatch = function _callee8(req, res) {
  var id;
  return regeneratorRuntime.async(function _callee8$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          id = req.params.id;
          req.body.price = parseInt(req.body.price);
          req.body.discountPercentage = parseInt(req.body.discountPercentage);
          req.body.stock = parseInt(req.body.stock);
          req.body.position = parseInt(req.body.position);

          if (req.file) {
            req.body.thumbnail = "/uploads/".concat(req.file.filename);
          }

          _context8.prev = 6;
          _context8.next = 9;
          return regeneratorRuntime.awrap(Product.updateOne({
            _id: id
          }, req.body));

        case 9:
          req.flash("success", "C\u1EADp nh\u1EADt th\xE0nh c\xF4ng!");
          _context8.next = 15;
          break;

        case 12:
          _context8.prev = 12;
          _context8.t0 = _context8["catch"](6);
          req.flash("error", "C\u1EADp nh\u1EADt th\u1EA5t b\u1EA1i!");

        case 15:
          res.redirect("back");

        case 16:
        case "end":
          return _context8.stop();
      }
    }
  }, null, null, [[6, 12]]);
}; // [GET] /admin/products/detail/:id


module.exports.detail = function _callee9(req, res) {
  var find, product;
  return regeneratorRuntime.async(function _callee9$(_context9) {
    while (1) {
      switch (_context9.prev = _context9.next) {
        case 0:
          _context9.prev = 0;
          find = {
            deleted: false,
            _id: req.params.id
          };
          _context9.next = 4;
          return regeneratorRuntime.awrap(Product.findOne(find));

        case 4:
          product = _context9.sent;
          console.log(product);
          res.render("admin/pages/products/detail", {
            pageTitle: product.title,
            product: product
          });
          _context9.next = 12;
          break;

        case 9:
          _context9.prev = 9;
          _context9.t0 = _context9["catch"](0);
          res.redirect("".concat(systemConfig.prefixAdmin, "/products"));

        case 12:
        case "end":
          return _context9.stop();
      }
    }
  }, null, null, [[0, 9]]);
};