import express from "express";
import {
  justGet,
  uploadHere,
  uploadImage,
} from "../controller/userController.js";
const router = express();

router.get("/", justGet);
router.get("/upload-image", uploadHere);
router.post("/upload-image", uploadImage);

// router.get("/get-image", userController.getImage);

export { router };
