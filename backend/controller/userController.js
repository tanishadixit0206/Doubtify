import path from "path";
import { fileURLToPath } from "url";
import multer from "multer";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const justGet = async (req, res) => {
  try {
    res.send("Hello!");
  } catch (err) {
    res.status(404).json({ message: "error !!" });
  }
};

const uploadHere = (req, res) => {
  try {
    return res.render("upload");
  } catch (err) {
    console.log(err);
    res.status(404).json({ message: "error !!" });
  }
};



export { justGet, uploadHere };
