import { Router } from "express"
import passport from "passport"
import { loginUserController, logoutUserController, registerUserController, getCurrentUserController, updateUserDetailsController, updatePasswordController, forgotPasswordController, resetPasswordController, googleAuthController } from "../controllers/users.controllers.js"
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
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"],prompt:"select_account" }))
router.get("/google/callback",passport.authenticate("google", { failureRedirect: "/login", session: false }),googleAuthController
)


export default router
