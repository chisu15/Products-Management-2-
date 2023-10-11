"use strict";

var express = require("express");

var router = express.Router();

var controller = require("../../controllers/admin/role.controller");

router.get("/", controller.index);
router.get("/create", controller.create);
router.post("/create", controller.createPost);
router.get("/edit/:id", controller.edit);
router.patch("/edit/:id", controller.editPatch);
router.get("/permissions", controller.permissions);
router.patch("/permissions", controller.permissionsPatch);
module.exports = router;