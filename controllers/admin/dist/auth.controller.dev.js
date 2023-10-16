"use strict";

var md5 = require("md5");

var Account = require("../../models/account.model");

var systemConfig = require("../../config/system"); // [GET] /admin/auth/login


module.exports.login = function (req, res) {
  res.render("admin/pages/auth/login", {
    pageTitle: "Đăng nhập"
  });
}; // [POST] /admin/auth/login


module.exports.loginPost = function _callee(req, res) {
  var email, password, user;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          email = req.body.email;
          password = req.body.password;
          _context.next = 4;
          return regeneratorRuntime.awrap(Account.findOne({
            email: email,
            deleted: false
          }));

        case 4:
          user = _context.sent;

          if (user) {
            _context.next = 9;
            break;
          }

          req.flash("error", "Email không tồn tại!");
          res.redirect("back");
          return _context.abrupt("return");

        case 9:
          if (!(md5(password) != user.password)) {
            _context.next = 13;
            break;
          }

          req.flash("error", "Sai mật khẩu!");
          res.redirect("back");
          return _context.abrupt("return");

        case 13:
          if (!(user.status == "inactive")) {
            _context.next = 17;
            break;
          }

          req.flash("error", "Tài khoản đã bị khóa!");
          res.redirect("back");
          return _context.abrupt("return");

        case 17:
          res.cookie("token", user.token);
          res.redirect("".concat(systemConfig.prefixAdmin, "/dashboard"));

        case 19:
        case "end":
          return _context.stop();
      }
    }
  });
}; // [GET] /admin/auth/logout


module.exports.logout = function (req, res) {
  res.clearCookie("token");
  res.redirect("".concat(systemConfig.prefixAdmin, "/auth/login"));
};