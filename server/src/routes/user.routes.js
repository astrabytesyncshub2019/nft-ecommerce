import { Router } from "express"
import { loginUserController, logoutUserController, registerUserController, getCurrentUserController, updateUserDetailsController, updatePasswordController, forgotPasswordController, resetPasswordController } from "../controllers/users.controllers.js"
import { registerValidations, loginValidations } from "../validations/users.validations.js"
import { validateRequest } from "../middlewares/validateRequest.js"
import { authMiddleware } from "../middlewares/authMiddleware.js"
const router = Router()

router.post("/signup", registerValidations, validateRequest, registerUserController)
router.post("/signin", loginValidations, validateRequest, loginUserController)
router.post("/logout", authMiddleware, logoutUserController)
router.get("/currentUser", authMiddleware, getCurrentUserController)
router.patch("/updateDetails", authMiddleware, updateUserDetailsController)
router.patch("/updatePassword", authMiddleware, updatePasswordController)
router.patch("/forgetPassword", authMiddleware, forgotPasswordController)
router.patch("/resetPassword", authMiddleware, resetPasswordController)
export default router
