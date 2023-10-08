"use strict";

var express = require("express");

var multer = require("multer");

var router = express.Router();
var upload = multer();

var controller = require("../../controllers/admin/product.controller");

var validate = require("../../validates/admin/product.validate");

var uploadCloud = require("../../middlewares/admin/uploadCloud.middleware");

router.get("/", controller.index);
router.patch("/change-status/:status/:id", controller.changeStatus);
router.patch("/change-multi", controller.changeMulti);
router["delete"]("/delete/:id", controller.deleteItem);
router.get("/create", controller.create);
router.post("/create", upload.single("thumbnail"), uploadCloud.upload, validate.createPost, controller.createPost);
router.get("/edit/:id", controller.edit);
router.patch("/edit/:id", upload.single("thumbnail"), uploadCloud.upload, validate.createPost, controller.editPatch);
router.get("/detail/:id", controller.detail);
module.exports = router;