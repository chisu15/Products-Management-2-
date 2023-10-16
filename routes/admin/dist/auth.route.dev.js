"use strict";

var express = require("express");

var router = express.Router();

var controller = require("../../controllers/admin/auth.controller");

var validate = require("../../validates/admin/auth.validate");

router.get("/login", controller.login);
router.post("/login", validate.loginPost, controller.loginPost);
router.get("/logout", controller.logout);
module.exports = router;