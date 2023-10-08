"use strict";

module.exports.createPost = function (req, res, next) {
  if (!req.body.title) {
    req.flash("error", "Vui l\xF2ng nh\u1EADp ti\xEAu \u0111\u1EC1!");
    res.redirect("back");
    return;
  }

  next();
};