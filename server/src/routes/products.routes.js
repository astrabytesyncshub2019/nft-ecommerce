import { Router } from "express"
import { deleteProductController, getAllProductsController, productsController, updateProductController } from "../controllers/products.controllers.js"
import { validateProducts } from "../validations/products.validations.js"
import { validateRequest } from "../middlewares/validateRequest.js"
import { authMiddleware } from "../middlewares/authMiddleware.js"
import { adminMiddleware } from "../middlewares/adminMiddleware.js"
import { uploadWithHash } from "../middlewares/uploadMiddleware.js"

const router = Router()

router.post("/createProducts", authMiddleware, adminMiddleware, uploadWithHash("image"), validateProducts, validateRequest, productsController)
router.get("/", getAllProductsController)
router.patch("/:productId", authMiddleware, adminMiddleware, uploadWithHash("image"), validateProducts, validateRequest, updateProductController)
router.delete("/:productId", authMiddleware, adminMiddleware, deleteProductController)


export default router