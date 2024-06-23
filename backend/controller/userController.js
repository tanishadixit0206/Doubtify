import path from "path";
import mongoose from "mongoose";
// import "gridfs-stream";
// import "multer-gridfs-storage";
import { GridFsStorage } from "multer-gridfs-storage";
import Grid from "gridfs-stream";

import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//mongo connect
const mongoURL = "//127.0.0.1:27017/mongoUploads";
const conn = mongoose.createConnection(mongoURL);

let gfs;

conn.once("open", () => {
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection("uploads"); // Ensure you set the collection name here
});

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, path.join(__dirname, "../public/images/"));
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now();
//     cb(null, uniqueSuffix + file.originalname);
//   },
// });

// const upload = multer({ storage: storage });

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

// const uploadImage = async (req, res) => {
//   upload.single("up-image")(req, res, function (err) {
//     if (err) {
//       return res.status(500).send(err.message);
//     }
//     console.log("got to uploading");
//     console.log(req.body);
//     console.log(req.file);
//     return res.redirect("/user/upload-image");
//   });
// };

// exports.getImage = async (req, res) => {
//   try {
//     const images = await Image.find({});
//     res.send({ status: "ok", data: images });
//   } catch (error) {
//     res.json({ status: error });
//   }
// };

const storage = new GridFsStorage({
  url: mongoURL,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString("hex") + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: "uploads",
        };
        resolve(fileInfo);
      });
    });
  },
});
const upload = multer({ storage });

const uploadImage = async (req, res) => {
  upload.single("up-image")(req, res, function (err) {
    if (err) {
      return res.status(500).send(err.message);
    }
    console.log("got to uploading");
    res.json({ file: req.file });
    return res.redirect("/user/upload-image");
  });
};

export { justGet, uploadImage, uploadHere };
