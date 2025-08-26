import { Router } from "express"
const router = Router()

import { cartController, getCartProducts, removeCartProductController ,incrementCartProductController} from "../controllers/cart.controllers.js"
import { authMiddleware } from "../middlewares/authMiddleware.js"

router.post("/:productId", authMiddleware, cartController)
router.get("/", authMiddleware, getCartProducts)
router.delete("/:productId", authMiddleware, removeCartProductController)
router.patch("/increment/:productId",authMiddleware,incrementCartProductController)


export default router