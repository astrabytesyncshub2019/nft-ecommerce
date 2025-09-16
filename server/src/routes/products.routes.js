import { Router } from "express"
import { deleteProductController, getAllProductsController, getProductsByCategoryController, productsController, updateProductController } from "../controllers/products.controllers.js"
import { validateProducts } from "../validations/products.validations.js"
import { validateRequest } from "../middlewares/validateRequest.js"
import { authMiddleware } from "../middlewares/authMiddleware.js"
import { adminMiddleware } from "../middlewares/adminMiddleware.js"
import { uploadWithHash } from "../middlewares/uploadMiddleware.js"
import { findProductByImageHash } from "../dao/products.dao.js"

const router = Router()

router.post(
  "/createProducts",
  authMiddleware,
  adminMiddleware,
  uploadWithHash("image", findProductByImageHash),
  productsController
)
router.get("/", getAllProductsController)
router.patch("/:productId", authMiddleware, adminMiddleware, uploadWithHash("image"), updateProductController)
router.delete("/:productId", authMiddleware, adminMiddleware, deleteProductController)
router.get("/category/:category", getProductsByCategoryController)


export default router