import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if (file.mimetype.startsWith("image/")) {
            cb(null, path.resolve("./uploads/images"));
        } else if (file.mimetype.startsWith("video/")) {
            cb(null, path.resolve("./uploads/videos"));
        } else {
            cb(null, path.resolve("./uploads/resumes"));
        }
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, Date.now() + file.originalname);
    },
});


const upload = multer({ storage });

export default upload;