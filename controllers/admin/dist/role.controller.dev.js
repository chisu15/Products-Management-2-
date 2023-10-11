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
};