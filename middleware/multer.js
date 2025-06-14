import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads/");
  },
  filename: function (req, file, cb) {
    const timestamp = Date.now();
    const cleanName = file.originalname.replace(/\s+/g, "-").toLowerCase();
    cb(null, `${timestamp}-${cleanName}`);
  },
});
const upload = multer({ storage });

export default upload;
