import multer from "multer"
import crypto from "crypto"
import { AppError } from "../utils/errorHandler.js"

// Generate SHA256 hash for a file buffer
const generateFileHash = (buffer) => {
  return crypto.createHash("sha256").update(buffer).digest("hex")
}

// Use memory storage for ImageKit
const storage = multer.memoryStorage()

// Validate image types
const fileFilter = (req, file, cb) => {
  const allowedFiles = /jpeg|jpg|png|webp/
  const extname = allowedFiles.test(file.originalname.toLowerCase())
  const mimeType = allowedFiles.test(file.mimetype)

  if (extname && mimeType) cb(null, true)
  else cb(new AppError("Only images (jpeg, jpg, png, webp) are allowed", 400))
}

const upload = multer({
  storage,
  limits: { fileSize: 12 * 1024 * 1024 }, // 12MB
  fileFilter
})

export default upload

// Middleware to generate hash
export const uploadWithHash = (fieldName, findDuplicateInDB) => {
  return async (req, res, next) => {
    const singleUpload = upload.single(fieldName)

    singleUpload(req, res, async (err) => {
      try {
        if (err) return next(err)
        if (!req.file) return next() // no file uploaded

        // 1️⃣ Generate hash from buffer
        const hash = crypto.createHash("sha256").update(req.file.buffer).digest("hex")
        req.file.hash = hash

        // 2️⃣ Check for duplicate in DB
        const existingProduct = await findDuplicateInDB(hash)
        if (existingProduct) {
          return next(new AppError("Duplicate image detected. Upload rejected.", 409))
        }

        next()
      } catch (error) {
        next(error)
      }
    })
  }
}
