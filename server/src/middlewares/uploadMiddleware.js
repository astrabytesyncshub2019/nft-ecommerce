import crypto from "crypto"
import upload from "../config/multer.config.js"
import { findProductByImageHash } from "../dao/products.dao.js"
import { ConflictError } from "../utils/errorHandler.js"

export const uploadWithHash = (fieldName) => {
  return (req, res, next) => {
    const singleUpload = upload.single(fieldName)

    singleUpload(req, res, async (err) => {
      try {
        if (err) return next(err)
        if (!req.file) return next() 

        const hash = crypto.createHash("sha256").update(req.file.buffer).digest("hex")
        req.file.hash = hash

    
        const existingProduct = await findProductByImageHash(hash)
        if (existingProduct) {
          return next(new ConflictError("Duplicate image detected. Upload rejected.", 409))
        }


        next()
      } catch (error) {
        next(error)
      }
    })
  }
}
