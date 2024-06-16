const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const userController = require("../controller/userController");

router.get("/", userController.justGet);
router.get("/upload-image", userController.uploadHere);
router.post("/upload-image", userController.uploadImage);

// router.get("/get-image", userController.getImage);

module.exports = router;
