import { Router } from "express"
const router = Router()

import { cartController } from "../controllers/cart.controllers.js"
import { authMiddleware } from "../middlewares/authMiddleware.js"

router.post("/:productId",authMiddleware, cartController)


export default router