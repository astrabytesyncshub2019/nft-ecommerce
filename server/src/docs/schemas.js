/**
 * @swagger
 * components:
 *   schemas:
 *     SignupRequest:
 *       type: object
 *       required:
 *         - fullname
 *         - email
 *         - password
 *         - phonenumber
 *         - role
 *       properties:
 *         fullname:
 *           type: object
 *           required:
 *             - firstname
 *             - lastname
 *           properties:
 *             firstname:
 *               type: string
 *             lastname:
 *               type: string
 *           example:
 *             firstname: Manpreet Singh
 *             lastname: Randhawa
 *         email:
 *           type: string
 *           format: email
 *           example: manpreet@gmail.com
 *         password:
 *           type: string
 *           example: password
 *         phonenumber:
 *           type: number
 *           example: 1234567890
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     LoginResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         message:
 *           type: string
 *           example: User Login successfully
 *         data:
 *           type: object
 *           properties:
 *             fullname:
 *               type: object
 *               properties:
 *                 firstname:
 *                   type: string
 *                   example: mann
 *                 lastname:
 *                   type: string
 *                   example: randhawa
 *             _id:
 *               type: string
 *               example: 68c14795d14538edc38ae9d0
 *             email:
 *               type: string
 *               format: email
 *               example: manpreet@gmail.com
 *             phonenumber:
 *               type: number
 *               example: 1234567890
 *             addresses:
 *               type: array
 *               items:
 *                 type: string
 *               example: ["68cab55cb9e11a16406c15f7", "68cac23bc5713a28e96cf055"]
 *             role:
 *               type: string
 *               example: user
 *             refreshToken:
 *               type: string
 *               description: JWT refresh token
 *               example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *             likedProducts:
 *               type: array
 *               items:
 *                 type: string
 *             createdAt:
 *               type: string
 *               format: date-time
 *               example: 2025-09-10T09:40:37.767Z
 *             updatedAt:
 *               type: string
 *               format: date-time
 *               example: 2025-09-21T04:08:51.884Z
 */


/**
 * @swagger
 * components:
 *   schemas:
 *     Address:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: 68cacedbf28e6f32516e1fa4
 *         user:
 *           type: string
 *           example: 68c14795d14538edc38ae9d0
 *         street:
 *           type: string
 *           example: Uchoke kalan
 *         city:
 *           type: string
 *           example: Amritsar
 *         state:
 *           type: string
 *           example: Punjab
 *         postalCode:
 *           type: string
 *           example: 143119
 *         country:
 *           type: string
 *           example: India
 *         landmark:
 *           type: string
 *           example: near gurudwara
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: 2025-09-17T15:08:11.734Z
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           example: 2025-09-17T15:08:11.734Z
 *         __v:
 *           type: integer
 *           example: 0
 *
 *     User:
 *       type: object
 *       properties:
 *         fullname:
 *           type: object
 *           properties:
 *             firstname:
 *               type: string
 *               example: mann
 *             lastname:
 *               type: string
 *               example: randhawa
 *         _id:
 *           type: string
 *           example: 68c14795d14538edc38ae9d0
 *         email:
 *           type: string
 *           example: manpreet@gmail.com
 *         phonenumber:
 *           type: number
 *           example: 1234567890
 *         addresses:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Address'
 *         role:
 *           type: string
 *           example: user
 *         refreshToken:
 *           type: string
 *           description: JWT refresh token
 *         likedProducts:
 *           type: array
 *           items:
 *             type: string
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: 2025-09-10T09:40:37.767Z
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           example: 2025-09-21T04:08:51.884Z
 *
 *     CurrentUserResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         message:
 *           type: string
 *           example: Current user fetched successfully
 *         data:
 *           $ref: '#/components/schemas/User'
 *
 *     UnauthorizedError:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: false
 *         message:
 *           type: string
 *           example: Unauthorized - no refresh token
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     UpdateUserRequest:
 *       type: object
 *       properties:
 *         fullname:
 *           type: object
 *           properties:
 *             firstname:
 *               type: string
 *               example: john
 *             lastname:
 *               type: string
 *               example: doe
 *         email:
 *           type: string
 *           format: email
 *           example: john@example.com
 *         phonenumber:
 *           type: string
 *           example: 9876543210
 *         password:
 *           type: string
 *           format: password
 *           example: Password123
 *
 *     UpdateUserResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         message:
 *           type: string
 *           example: User details updated successfully
 *         data:
 *           $ref: '#/components/schemas/User'
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     UpdatePasswordRequest:
 *       type: object
 *       required:
 *         - currentPassword
 *         - newPassword
 *       properties:
 *         currentPassword:
 *           type: string
 *           format: password
 *           example: Password123
 *         newPassword:
 *           type: string
 *           format: password
 *           example: password
 *
 *     UpdatePasswordResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         message:
 *           type: string
 *           example: Password updated successfully
 */


/**
 * @swagger
 * components:
 *   schemas:
 *     ForgetPasswordRequest:
 *       type: object
 *       required:
 *         - email
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           example: randhawamanpreet37@gmail.com
 *
 *     ForgetPasswordResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         message:
 *           type: string
 *           example: Reset link has been sent to your email
 *
 *     ForgetPasswordError:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: false
 *         message:
 *           type: string
 *           example: User with this email does not exist
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     CartProduct:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: 68ac29fac6e1bf485940e1d3
 *         name:
 *           type: string
 *           example: Sample Product
 *         price:
 *           type: number
 *           example: 499
 *         quantity:
 *           type: number
 *           example: 1
 *
 *     CartSuccessResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         message:
 *           type: string
 *           example: Product retrieved successfully
 *         data:
 *           $ref: '#/components/schemas/CartProduct'
 *
 *     CartErrorResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: false
 *         message:
 *           type: string
 *           example: Product not found
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       required:
 *         - name
 *         - description
 *         - price
 *         - category
 *         - image
 *       properties:
 *         _id:
 *           type: string
 *           example: 64f5b8e13b0c2a0012345678
 *         name:
 *           type: string
 *           example: Urban Explorer Backpack
 *         description:
 *           type: string
 *           example: A durable everyday backpack with laptop sleeve and multiple compartments.
 *         price:
 *           type: number
 *           example: 5666
 *         category:
 *           type: string
 *           example: backpacks
 *         image:
 *           type: string
 *           example: /uploads/FOCUS.jpg
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: 2025-09-21T10:20:30.000Z
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           example: 2025-09-21T10:20:30.000Z
 */


/**
 * @swagger
 * components:
 *   schemas:
 *     CheckoutProduct:
 *       type: object
 *       required:
 *         - productId
 *         - quantity
 *       properties:
 *         productId:
 *           type: string
 *           example: 68ab4d4457a1c1828bfc63e5
 *         quantity:
 *           type: number
 *           example: 2
 *
 *     CheckoutRequest:
 *       type: object
 *       required:
 *         - products
 *       properties:
 *         products:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/CheckoutProduct'
 *         shippingAddressId:
 *           type: string
 *           description: Optional shipping address ID
 *           example: 68cacedbf28e6f32516e1fa4
 *
 *     CheckoutResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         message:
 *           type: string
 *           example: Checkout session created successfully
 *         sessionUrl:
 *           type: string
 *           description: URL to redirect the user to complete payment
 *           example: https://checkout.stripe.com/pay/cs_test_123456789
 */



