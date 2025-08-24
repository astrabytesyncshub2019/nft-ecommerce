import { Router } from "express"
import { getAllProductsController, productsController } from "../controllers/products.controllers.js"
import { validateProducts } from "../validations/products.validations.js"
import { validateRequest } from "../middlewares/validateRequest.js"
import upload from "../config/multer.config.js"
import { authMiddleware } from "../middlewares/authMiddleware.js"
import { adminMiddleware } from "../middlewares/adminMiddleware.js"

const router = Router()

router.post("/createProducts", authMiddleware, adminMiddleware, upload.single("image"), validateProducts, validateRequest, productsController)
router.get("/", getAllProductsController)


export default router