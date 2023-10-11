"use strict";

var express = require("express");

var router = express.Router();

var controller = require("../../controllers/admin/role.controller");

router.get("/", controller.index);
router.get("/create", controller.create);
router.post("/create", controller.createPost);
module.exports = router;