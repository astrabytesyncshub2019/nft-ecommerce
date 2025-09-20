import { Router } from "express"
import express from "express"
import { authMiddleware } from "../middlewares/authMiddleware.js"
import { createCheckoutSession, handleWebhook } from "../controllers/payment.controller.js"

const router = Router()

router.post("/", authMiddleware, createCheckoutSession)
router.post("/webhook", express.raw({ type: "application/json" }), handleWebhook)

export default router
