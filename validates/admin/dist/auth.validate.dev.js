"use strict";

module.exports.loginPost = function (req, res, next) {
  if (!req.body.email) {
    req.flash("error", "Vui l\xF2ng nh\u1EADp email!");
    res.redirect("back");
    return;
  }

  if (!req.body.password) {
    req.flash("error", "Vui l\xF2ng nh\u1EADp m\u1EADt kh\u1EA9u!");
    res.redirect("back");
    return;
  }

  next();
};