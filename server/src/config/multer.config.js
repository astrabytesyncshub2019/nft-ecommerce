import multer from "multer"
import path from "path"
import fs from "fs"
import { fileURLToPath } from "url"
import { AppError } from "../utils/errorHandler.js"
import crypto from "crypto"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const uploadPath = path.join(__dirname, "../uploads")

const generateRandomString = (length = 4) => {
    return crypto.randomBytes(length).toString("hex")
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        fs.mkdir(uploadPath, { recursive: true }, (err) => {
            if (err) return cb(err, uploadPath)
            cb(null, uploadPath)
        })
    },
    filename: function (req, file, cb) {
        const randomPrefix = generateRandomString(4)
        const safeName = file.originalname.replace(/\s+/g, "_")
        cb(null, `${randomPrefix}-${safeName}`)
    }
})

const fileFilter = (req, file, cb) => {
    const allowedFiles = /jpeg|jpg|png|webp/
    const extname = allowedFiles.test(path.extname(file.originalname).toLowerCase())
    const mimeType = allowedFiles.test(file.mimetype)

    if (extname && mimeType) {
        cb(null, true)
    } else {
        cb(new AppError("Only images (jpeg, jpg, png, webp) are allowed", 400))
    }
}

const upload = multer({
    storage,
    limits: { fileSize: 12 * 1024 * 1024 },
    fileFilter
})

export default upload
