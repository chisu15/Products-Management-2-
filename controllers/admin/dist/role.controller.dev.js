"use strict";

var Role = require("../../models/role.model");

var systemConfig = require("../../config/system"); // [GET] /admin/roles


module.exports.index = function _callee(req, res) {
  var find, records;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          find = {
            deleted: false
          };
          _context.next = 3;
          return regeneratorRuntime.awrap(Role.find(find));

        case 3:
          records = _context.sent;
          res.render("admin/pages/roles/index", {
            pageTitle: "Nhóm quyền",
            records: records
          });

        case 5:
        case "end":
          return _context.stop();
      }
    }
  });
}; // [GET] /admin/roles/create


module.exports.create = function _callee2(req, res) {
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          res.render("admin/pages/roles/create", {
            pageTitle: "Tạo nhóm quyền"
          });

        case 1:
        case "end":
          return _context2.stop();
      }
    }
  });
}; // [POST] /admin/roles/create


module.exports.createPost = function _callee3(req, res) {
  var record;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          record = new Role(req.body);
          _context3.next = 3;
          return regeneratorRuntime.awrap(record.save());

        case 3:
          res.redirect("".concat(systemConfig.prefixAdmin, "/roles"));

        case 4:
        case "end":
          return _context3.stop();
      }
    }
  });
}; // [GET] /admin/roles/edit/:id


module.exports.edit = function _callee4(req, res) {
  var id, find, data;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          id = req.params.id;
          find = {
            _id: id,
            deleted: false
          };
          _context4.next = 5;
          return regeneratorRuntime.awrap(Role.findOne(find));

        case 5:
          data = _context4.sent;
          res.render("admin/pages/roles/edit", {
            pageTitle: "Sửa nhóm quyền",
            data: data
          });
          _context4.next = 12;
          break;

        case 9:
          _context4.prev = 9;
          _context4.t0 = _context4["catch"](0);
          res.redirect("".concat(systemConfig.prefixAdmin, "/roles"));

        case 12:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 9]]);
}; // [PATCH] /admin/roles/edit/:id


module.exports.editPatch = function _callee5(req, res) {
  var id;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          id = req.params.id;
          _context5.next = 4;
          return regeneratorRuntime.awrap(Role.updateOne({
            _id: id
          }, req.body));

        case 4:
          req.flash("success", "Cập nhật nhóm quyền thành công!");
          _context5.next = 10;
          break;

        case 7:
          _context5.prev = 7;
          _context5.t0 = _context5["catch"](0);
          req.flash("error", "Cập nhật nhóm quyền thất bại!");

        case 10:
          res.redirect("back");

        case 11:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[0, 7]]);
};