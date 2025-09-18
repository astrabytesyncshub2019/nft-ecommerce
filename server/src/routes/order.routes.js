import { Router } from "express"
import {
  placeOrderController,
  getUserOrdersController,
  getAllOrdersController,
  updateOrderStatusController
} from "../controllers/order.controller.js"
import { authMiddleware } from "../middlewares/authMiddleware.js"
import { adminMiddleware } from "../middlewares/adminMiddleware.js"

const router = Router()


router.post("/", authMiddleware, placeOrderController)
router.get("/", authMiddleware, getUserOrdersController)

router.get("/all", authMiddleware, adminMiddleware, getAllOrdersController)
router.patch("/:orderId/status", authMiddleware, adminMiddleware, updateOrderStatusController)             

export default router
