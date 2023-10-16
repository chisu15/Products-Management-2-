"use strict";

module.exports.createPost = function (req, res, next) {
  if (!req.body.fullName) {
    req.flash("error", "Vui l\xF2ng nh\u1EADp h\u1ECD t\xEAn!");
    res.redirect("back");
    return;
  }

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

module.exports.editPatch = function (req, res, next) {
  if (!req.body.fullName) {
    req.flash("error", "Vui l\xF2ng nh\u1EADp h\u1ECD t\xEAn!");
    res.redirect("back");
    return;
  }

  if (!req.body.email) {
    req.flash("error", "Vui l\xF2ng nh\u1EADp email!");
    res.redirect("back");
    return;
  }

  next();
};