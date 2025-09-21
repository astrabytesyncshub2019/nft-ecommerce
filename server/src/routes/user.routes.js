import { Router } from "express"
import passport from "passport"
import { loginUserController, logoutUserController, registerUserController, getCurrentUserController, updateUserDetailsController, updatePasswordController, forgotPasswordController, resetPasswordController, googleAuthController, userAddressController } from "../controllers/users.controllers.js"
import { registerValidations, loginValidations } from "../validations/users.validations.js"
import { validateRequest } from "../middlewares/validateRequest.js"
import { authMiddleware } from "../middlewares/authMiddleware.js"
const router = Router()




/**
 * @swagger
 * /api/users/signup:
 *    post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SignupRequest'
 *     responses:
 *       201:
 *         description: User successfully registered
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
 *                   example: User registered successfully
 *       400:
 *         description: Bad request (validation error)
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
 *                   example: Validation failed
 */
router.post("/signup", registerValidations, validateRequest, registerUserController)

/**
 * @swagger
 * /api/users/signin:
 *   post:
 *     summary: Login user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: manpreet@gmail.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: password
 *     responses:
 *       200:
 *         description: User logged in successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LoginResponse'
 *       401:
 *         description: Invalid credentials
 */

router.post("/signin", loginValidations, validateRequest, loginUserController)
/**
 * @swagger
 * /api/users/logout:
 *   post:
 *     summary: Logout user
 *     description: Logs out the authenticated user by invalidating their session or JWT.
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []   # If you're using JWT authentication
 *     responses:
 *       200:
 *         description: Successfully logged out
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
 *                   example: User logged out successfully
 *       401:
 *         description: Unauthorized (no valid token provided)
 */
router.post("/logout", authMiddleware, logoutUserController)
/**
 * @swagger
 * /api/users/currentUser:
 *   get:
 *     summary: Get current logged-in user
 *     description: need to login or session or JWT.
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []   # If you're using JWT authentication
 *     responses:
 *       200:
 *         description: Current user fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CurrentUserResponse'
 *       401:
 *         description: Unauthorized - no refresh token
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UnauthorizedError'
 */

router.get("/currentUser", authMiddleware, getCurrentUserController)
/**
 * @swagger
 * /api/users/updateDetails:
 *   patch:
 *     summary: user can update theri
 *     description: need to login or session or JWT.
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []   # If you're using JWT authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateUserRequest'
 *     responses:
 *       200:
 *         description: User details updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UpdateUserResponse'
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 */

router.patch("/updateDetails", authMiddleware, updateUserDetailsController)

/**
 * @swagger
 * /api/users/updatePassword:
 *   patch:
 *     summary: Update user's password
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdatePasswordRequest'
 *     responses:
 *       200:
 *         description: Password updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UpdatePasswordResponse'
 *       400:
 *         description: Invalid input (e.g., wrong current password)
 *       401:
 *         description: Unauthorized
 */
router.patch("/updatePassword", authMiddleware, updatePasswordController)
/**
 * @swagger
 * /api/users/forgetPassword:
 *   patch:
 *     summary: Request a password reset link
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ForgetPasswordRequest'
 *     responses:
 *       200:
 *         description: Reset link sent successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ForgetPasswordResponse'
 *       400:
 *         description: Invalid email or user not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ForgetPasswordError'
 */

router.patch("/forgetPassword", forgotPasswordController)
/**
 * @swagger
 * /api/users/resetPassword:
 *   patch:
 *     summary: Reset user password using token
 *     tags: [Auth]
 *     parameters:
 *       - in: query
 *         name: token
 *         schema:
 *           type: string
 *         required: true
 *         description: Password reset token from email link
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - newPassword
 *             properties:
 *               newPassword:
 *                 type: string
 *                 example: POSTMAN
 *     responses:
 *       200:
 *         description: Password reset successfully
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
 *                   example: Password has been reset successfully
 *       400:
 *         description: Invalid or expired token
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
 *                   example: Invalid or expired token
 */
router.patch("/resetPassword", resetPasswordController)
/**
 * @swagger
 * /api/users/google:
 *   get:
 *     summary: Login with Google OAuth
 *     tags: [Auth]
 *     description: Redirects user to Google login. After successful login, returns user data and JWT token.
 *     responses:
 *       302:
 *         description: Redirect to Google OAuth login
 *       200:
 *         description: Successful login
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
 *                   example: User logged in successfully via Google
 *                 data:
 *                   type: object
 *                   properties:
 *                     fullname:
 *                       type: object
 *                       properties:
 *                         firstname:
 *                           type: string
 *                           example: Manpreet
 *                         lastname:
 *                           type: string
 *                           example: Singh
 *                     email:
 *                       type: string
 *                       example: manpreet@gmail.com
 *                     role:
 *                       type: string
 *                       example: user
 *                     token:
 *                       type: string
 *                       example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *       401:
 *         description: Unauthorized / login failed
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
 *                   example: Google login failed
 */
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"], prompt: "select_account" }))
/**
 * @swagger
 * /api/users/google/callback:
 *   get:
 *     summary: Google OAuth callback
 *     tags: [Auth]
 *     description: This endpoint is called by Google after user login. Returns user data and JWT token.
 *     parameters:
 *       - in: query
 *         name: code
 *         schema:
 *           type: string
 *         required: true
 *         description: Authorization code returned by Google
 *       - in: query
 *         name: state
 *         schema:
 *           type: string
 *         required: false
 *         description: Optional state parameter
 *     responses:
 *       200:
 *         description: Successful login
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
 *                   example: User logged in successfully via Google
 *                 data:
 *                   type: object
 *                   properties:
 *                     fullname:
 *                       type: object
 *                       properties:
 *                         firstname:
 *                           type: string
 *                           example: Manpreet
 *                         lastname:
 *                           type: string
 *                           example: Singh
 *                     email:
 *                       type: string
 *                       example: manpreet@gmail.com
 *                     role:
 *                       type: string
 *                       example: user
 *                     token:
 *                       type: string
 *                       example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *       401:
 *         description: Google login failed or invalid token
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
 *                   example: Google login failed
 */
router.get("/google/callback", passport.authenticate("google", { failureRedirect: "/login", session: false }), googleAuthController
)
/**
 * @swagger
 * /api/users/checkout:
 *   post:
 *     summary: Add a shipping address during checkout
 *     tags: [Checkout]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - street
 *               - city
 *               - state
 *               - postalCode
 *               - country
 *             properties:
 *               street:
 *                 type: string
 *                 example: 123 MG Road
 *               city:
 *                 type: string
 *                 example: Bengaluru
 *               state:
 *                 type: string
 *                 example: Karnataka
 *               postalCode:
 *                 type: string
 *                 example: 560001
 *               country:
 *                 type: string
 *                 example: India
 *               landmark:
 *                 type: string
 *                 example: Near Metro Station
 *     responses:
 *       200:
 *         description: Shipping address added successfully
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
 *                   example: Shipping address added successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: 68cacedbf28e6f32516e1fa4
 *                     street:
 *                       type: string
 *                       example: 123 MG Road
 *                     city:
 *                       type: string
 *                       example: Bengaluru
 *                     state:
 *                       type: string
 *                       example: Karnataka
 *                     postalCode:
 *                       type: string
 *                       example: 560001
 *                     country:
 *                       type: string
 *                       example: India
 *                     landmark:
 *                       type: string
 *                       example: Near Metro Station
 *                     user:
 *                       type: string
 *                       example: 68c14795d14538edc38ae9d0
 *                     createdAt:
 *                       type: string
 *                       example: 2025-09-21T10:00:00.000Z
 *                     updatedAt:
 *                       type: string
 *                       example: 2025-09-21T10:00:00.000Z
 *       400:
 *         description: Invalid input
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
 *                   example: Invalid address data
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

router.post("/checkout", authMiddleware, userAddressController)


export default router
