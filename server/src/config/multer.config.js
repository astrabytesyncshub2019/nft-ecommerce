import multer from "multer"
import path from "path"
import fs from "fs"
import { fileURLToPath } from "url"
import { AppError } from "../utils/errorHandler.js"



const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const uploadPath = path.join(__dirname, "../uploads")
// console.log(__dirname)
// Ensure the folder exists
if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, { recursive: true })
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadPath)

    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1E9)
        cb(null, uniqueSuffix + path.extname(file.originalname))

    }
})



const fileFilter = (req, file, cb) => {
    const allowedFiles = /jpeg|jpg|png|webp/
    const extname = allowedFiles.test(path.extname(file.originalname).toLowerCase())
    const mimeType = allowedFiles.test(file.mimetype)

    if (extname && mimeType) {
        cb(null, true)
    } else {
        // cb(throw new AppError("Only images (jpeg, jpg, png, webp) are allowed"))
        cb(new AppError("Only images (jpeg, jpg, png, webp) are allowed", 400))
    }

}

const upload = multer({
    storage,
    limits: { fileSize: 12 * 1024 * 1024 },
    fileFilter
})

export default upload