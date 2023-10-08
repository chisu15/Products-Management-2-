"use strict";

var express = require("express");

var multer = require("multer");

var router = express.Router();
var upload = multer();

var controller = require("../../controllers/admin/product-category.controller");

var validate = require("../../validates/admin/product-category.validate");

var uploadCloud = require("../../middlewares/admin/uploadCloud.middleware");

router.get("/", controller.index);
router.get("/create", controller.create);
router.post("/create", upload.single("thumbnail"), uploadCloud.upload, validate.createPost, controller.createPost);
module.exports = router;