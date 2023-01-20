const multer = require("multer");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const storage = multer.diskStorage({
  destination: path.join(__dirname, "../public/images/products"),
  filename: (req, file, cb) => {
    cb(null, uuidv4() + path.extname(file.originalname));
  },
});
const upload = multer({
  storage: storage,
  dest: path.join(__dirname, "public/images/products"),
  limits: {
    fileSize: 1500000,
  },
  fileFilter: (req, file, cb) => {
    const fileType = /jpeg|jpg|png|webp/;
    const mimetype = fileType.test(file.mimetype);
    const extName = fileType.test(path.extname(file.originalname));
    if (mimetype && extName) {
      return cb(null, true);
    }
    cb("Error: debe ser una imagen soportada");
  },
}).single("image");

module.exports = {
  upload,
};
