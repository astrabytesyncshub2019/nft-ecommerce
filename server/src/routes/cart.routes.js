import { Router } from "express"
const router = Router()

import { cartController, getCartProducts } from "../controllers/cart.controllers.js"
import { authMiddleware } from "../middlewares/authMiddleware.js"

router.post("/:productId",authMiddleware, cartController)
router.get("/",authMiddleware,getCartProducts)


export default router