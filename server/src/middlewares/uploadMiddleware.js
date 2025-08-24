import fs from "fs/promises"
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

                // 1. Read file buffer (async)
                const fileBuffer = await fs.readFile(req.file.path)

                // 2. Generate SHA-256 hash
                const hash = crypto.createHash("sha256").update(fileBuffer).digest("hex")
                req.file.hash = hash

                // 3. Check for duplicate in DB
                const existingProduct = await findProductByImageHash(hash)
                if (existingProduct) {
                    // Delete duplicate file
                    await fs.unlink(req.file.path)
                    // console.log(req.file.path)
                    return next(new ConflictError("Duplicate image detected. Upload rejected.", 409))
                }

                // 4. Continue to controller
                next()
            } catch (error) {
                next(error)
            }
        })
    }
}
