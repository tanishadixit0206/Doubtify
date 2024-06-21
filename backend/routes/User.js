import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import methodOverride from "method-override";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import {
  justGet,
  uploadHere,
  uploadImage,
} from "../controller/userController.js";

const router = express();

//middleware
import bodyParser from "body-parser";

router.use((req, res, next) => {
  const app = req.app; // Get the main app instance
  app.set("view engine", "ejs");
  app.set("views", path.join(__dirname, "../views"));
  app.use(bodyParser.json);
  app.use(methodOverride("_method"));
  next();
});

router.get("/", justGet);
router.get("/upload-image", uploadHere);
router.post("/upload-image", uploadImage);

// router.get("/get-image", userController.getImage);

export { router };
