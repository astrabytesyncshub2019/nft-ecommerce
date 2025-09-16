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
  limits: { fileSize: 12 * 1024 * 1024 }, 
  fileFilter
})

export default upload

export const uploadWithHash = (fieldName, findProductByImageHash) => {
  return async (req, res, next) => {
    const singleUpload = upload.single(fieldName)

    singleUpload(req, res, async (err) => {
      try {
        if (err) return next(err)
        if (!req.file) return next() 

        const hash = crypto.createHash("sha256").update(req.file.buffer).digest("hex")
        req.file.hash = hash

        const existingProduct = await findProductByImageHash(hash)
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
