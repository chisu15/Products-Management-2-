"use strict";

var express = require("express");

var multer = require("multer");

var router = express.Router();
var upload = multer();

var controller = require("../../controllers/admin/account.controller");

var validate = require("../../validates/admin/account.validate");

var uploadCloud = require("../../middlewares/admin/uploadCloud.middleware");

router.get("/", controller.index);
router.get("/create", controller.create);
router.post("/create", upload.single("avatar"), uploadCloud.upload, validate.createPost, controller.createPost);
router.get("/edit/:id", controller.edit);
router.patch("/edit/:id", upload.single("avatar"), uploadCloud.upload, validate.editPatch, controller.editPatch);
module.exports = router;