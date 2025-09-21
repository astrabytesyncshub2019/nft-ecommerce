import { Router } from "express"
const router = Router()

import { cartController, getCartProducts, removeCartProductController, incrementCartProductController, decrementCartProductController,deleteCartController } from "../controllers/cart.controllers.js"
import { authMiddleware } from "../middlewares/authMiddleware.js"

/**
 * @swagger
 * /api/cart/{productId}:
 *   post:
 *     summary: add product to the cart by their product id
 *     tags: [Cart]
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the product in the cart
 *     responses:
 *       200:
 *         description: Product added sucessfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CartSuccessResponse'
 *       404:
 *         description: Product not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CartErrorResponse'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CartErrorResponse'
 */

router.post("/:productId", authMiddleware, cartController)
/**
 * @swagger
 * /api/cart:
 *   get:
 *     summary: Get all products in the user's cart
 *     tags: [Cart]
 *     responses:
 *       200:
 *         description: Cart products fetched successfully
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
 *                   example: Cart products fetched successfully
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/CartProduct'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CartErrorResponse'
 */
router.get("/", authMiddleware, getCartProducts)

/**
 * @swagger
 * /api/cart:
 *   delete:
 *     summary: Delete all products from the user's cart
 *     tags: [Cart]
 *     responses:
 *       200:
 *         description: Cart deleted successfully
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
 *                   example: Cart deleted successfully
 *       404:
 *         description: Cart deletion failed
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
 *                   example: Cart deletion failed
 *       401:
 *         description: Unauthorized
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


router.delete("/deleteCart",authMiddleware,deleteCartController)
/**
 * @swagger
 * /api/cart/{productId}:
 *   delete:
 *     summary: Get a single product from the cart by product ID
 *     tags: [Cart]
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the product in the cart
 *     responses:
 *       200:
 *         description: Product found in cart
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CartSuccessResponse'
 *       404:
 *         description: Product not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CartErrorResponse'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CartErrorResponse'
 */
router.delete("/:productId", authMiddleware, removeCartProductController)
/**
 * @swagger
 * /api/cart/increment/{productId}:
 *   patch:
 *     summary: Increment quantity of a product in the cart
 *     tags: [Cart]
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the product to increment
 *     responses:
 *       200:
 *         description: Product quantity incremented successfully
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
 *                   example: Product quantity updated
 *                 data:
 *                   $ref: '#/components/schemas/CartProduct'
 *       404:
 *         description: Product not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CartErrorResponse'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CartErrorResponse'
 */
router.patch("/increment/:productId", authMiddleware, incrementCartProductController)
/**
 * @swagger
 * /api/cart/decrement/{productId}:
 *   patch:
 *     summary: Decrement quantity of a product in the cart
 *     tags: [Cart]
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the product to decrement
 *     responses:
 *       200:
 *         description: Product quantity decremented successfully
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
 *                   example: Product quantity updated
 *                 data:
 *                   $ref: '#/components/schemas/CartProduct'
 *       404:
 *         description: Product not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CartErrorResponse'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CartErrorResponse'
 */
router.patch("/decrement/:productId", authMiddleware, decrementCartProductController)


export default router