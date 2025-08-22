import multer from "multer"
import fs from "fs"
import path from "path"
import { AppError } from "../utils/errorHandler.js"

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/")

    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1E9)
        cb(null, uniqueSuffix + path.extname(file.originalname))

    }
})


// used file to store only image type files
const fileFilter = (req, file, cb) => {
    const allowedFiles = /jpeg|jpg|png|webp/
    const extname = allowedFiles.test(path.extname(file.originalname).toLowerCase())
    const mimeType = allowedFiles.test(file.mimetype)

    if (extname && mimeType) {
        cb(null, true)
    } else {
        // cb(throw new AppError("Only images (jpeg, jpg, png, webp) are allowed"))
        cb(new Error("Only images (jpeg, jpg, png, webp) are allowed"))
    }

}

const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 },
    fileFilter
})

export default upload