import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../public/images/"));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + file.originalname);
  },
});

const upload = multer({ storage: storage });

const justGet = async (req, res) => {
  try {
    res.send("Hello!");
  } catch (err) {
    res.status(404).json({ message: "error !!" });
  }
};

const uploadHere = async (req, res) => {
  try {
    return res.render("upload");
  } catch (err) {
    res.status(404).json({ message: "error !!" });
  }
};



const uploadImage = async (req, res) => {
  upload.single("up-image")(req, res, function (err) {
    if (err) {
      return res.status(500).send(err.message);
    }
    console.log("got to uploading");
    console.log(req.body);
    console.log(req.file);
    return res.redirect("/upload-image");
  });
};

// exports.getImage = async (req, res) => {
//   try {
//     const images = await Image.find({});
//     res.send({ status: "ok", data: images });
//   } catch (error) {
//     res.json({ status: error });
//   }
// };

export { justGet, uploadImage, uploadHere };
