import { Router } from "express"
import express from "express"
import { authMiddleware } from "../middlewares/authMiddleware.js"
import { createCheckoutSession, handleWebhook } from "../controllers/payment.controller.js"

const router = Router()

/**
 * @swagger
 * /api/payment/:
 *   post:
 *     summary: Create a checkout session (authenticated users only)
 *     tags: [Payment]
 *     security:
 *       - bearerAuth: []   # Requires login
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - products
 *             properties:
 *               products:
 *                 type: array
 *                 description: List of products to checkout
 *                 items:
 *                   type: object
 *                   required:
 *                     - productId
 *                     - quantity
 *                   properties:
 *                     productId:
 *                       type: string
 *                       example: 68ab4d4457a1c1828bfc63e5
 *                     quantity:
 *                       type: number
 *                       example: 2
 *               shippingAddressId:
 *                 type: string
 *                 description: Optional shipping address ID
 *                 example: 68cacedbf28e6f32516e1fa4
 *     responses:
 *       200:
 *         description: Checkout session created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Checkout session created successfully
 *                 sessionUrl:
 *                   type: string
 *                   description: URL to redirect the user to complete payment
 *                   example: https://checkout.stripe.com/pay/cs_test_123456789
 *       400:
 *         description: Bad request (e.g., invalid product data)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Invalid product data
 *       401:
 *         description: Unauthorized (user not logged in)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Unauthorized
 */
router.post("/", authMiddleware, createCheckoutSession)
router.post("/webhook", express.raw({ type: "application/json" }), handleWebhook)

export default router
