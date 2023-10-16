"use strict";

var md5 = require("md5");

var Account = require("../../models/account.model");

var Role = require("../../models/role.model");

var systemConfig = require("../../config/system"); // [GET] /admin/accounts


module.exports.index = function _callee(req, res) {
  var find, records, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, record, role;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          find = {
            deleted: false
          };
          _context.next = 3;
          return regeneratorRuntime.awrap(Account.find(find).select("-password -token"));

        case 3:
          records = _context.sent;
          _iteratorNormalCompletion = true;
          _didIteratorError = false;
          _iteratorError = undefined;
          _context.prev = 7;
          _iterator = records[Symbol.iterator]();

        case 9:
          if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
            _context.next = 18;
            break;
          }

          record = _step.value;
          _context.next = 13;
          return regeneratorRuntime.awrap(Role.findOne({
            _id: record.role_id,
            deleted: false
          }));

        case 13:
          role = _context.sent;
          record.role = role;

        case 15:
          _iteratorNormalCompletion = true;
          _context.next = 9;
          break;

        case 18:
          _context.next = 24;
          break;

        case 20:
          _context.prev = 20;
          _context.t0 = _context["catch"](7);
          _didIteratorError = true;
          _iteratorError = _context.t0;

        case 24:
          _context.prev = 24;
          _context.prev = 25;

          if (!_iteratorNormalCompletion && _iterator["return"] != null) {
            _iterator["return"]();
          }

        case 27:
          _context.prev = 27;

          if (!_didIteratorError) {
            _context.next = 30;
            break;
          }

          throw _iteratorError;

        case 30:
          return _context.finish(27);

        case 31:
          return _context.finish(24);

        case 32:
          res.render("admin/pages/accounts/index", {
            pageTitle: "Danh sách tài khoản",
            records: records
          });

        case 33:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[7, 20, 24, 32], [25,, 27, 31]]);
}; // [GET] /admin/accounts/create


module.exports.create = function _callee2(req, res) {
  var roles;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(Role.find({
            deleted: false
          }));

        case 2:
          roles = _context2.sent;
          res.render("admin/pages/accounts/create", {
            pageTitle: "Tạo mới tài khoản",
            roles: roles
          });

        case 4:
        case "end":
          return _context2.stop();
      }
    }
  });
}; // [POST] /admin/accounts/create


module.exports.createPost = function _callee3(req, res) {
  var emailExist, record;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return regeneratorRuntime.awrap(Account.findOne({
            email: req.body.email,
            deleted: false
          }));

        case 2:
          emailExist = _context3.sent;

          if (!emailExist) {
            _context3.next = 8;
            break;
          }

          req.flash("error", "Email ".concat(req.body.email, " \u0111\xE3 t\u1ED3n t\u1EA1i"));
          res.redirect("back");
          _context3.next = 13;
          break;

        case 8:
          req.body.password = md5(req.body.password);
          record = new Account(req.body);
          _context3.next = 12;
          return regeneratorRuntime.awrap(record.save());

        case 12:
          res.redirect("".concat(systemConfig.prefixAdmin, "/accounts"));

        case 13:
        case "end":
          return _context3.stop();
      }
    }
  });
}; // [GET] /admin/accounts/edit/:id


module.exports.edit = function _callee4(req, res) {
  var find, data, roles;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          find = {
            _id: req.params.id,
            deleted: false
          };
          _context4.prev = 1;
          _context4.next = 4;
          return regeneratorRuntime.awrap(Account.findOne(find));

        case 4:
          data = _context4.sent;
          _context4.next = 7;
          return regeneratorRuntime.awrap(Role.find({
            deleted: false
          }));

        case 7:
          roles = _context4.sent;
          res.render("admin/pages/accounts/edit", {
            pageTitle: "Chỉnh sửa tài khoản",
            data: data,
            roles: roles
          });
          _context4.next = 14;
          break;

        case 11:
          _context4.prev = 11;
          _context4.t0 = _context4["catch"](1);
          res.redirect("/".concat(systemConfig.prefixAdmin, "/accounts"));

        case 14:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[1, 11]]);
}; // [PATCH] /admin/accounts/edit/:id


module.exports.editPatch = function _callee5(req, res) {
  var id, emailExist;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          id = req.params.id;
          _context5.next = 3;
          return regeneratorRuntime.awrap(Account.findOne({
            _id: {
              $ne: id
            },
            email: req.body.email,
            deleted: false
          }));

        case 3:
          emailExist = _context5.sent;

          if (!emailExist) {
            _context5.next = 8;
            break;
          }

          req.flash("error", "Email ".concat(req.body.email, " \u0111\xE3 t\u1ED3n t\u1EA1i"));
          _context5.next = 12;
          break;

        case 8:
          if (req.body.password) {
            req.body.password = md5(req.body.password);
          } else {
            delete req.body.password;
          }

          _context5.next = 11;
          return regeneratorRuntime.awrap(Account.updateOne({
            _id: id
          }, req.body));

        case 11:
          req.flash("success", "Cập nhật tài khoản thành công!");

        case 12:
          res.redirect("back");

        case 13:
        case "end":
          return _context5.stop();
      }
    }
  });
};