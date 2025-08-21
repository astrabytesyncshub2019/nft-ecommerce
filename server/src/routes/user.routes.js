import { Router } from "express"
import { loginUserController, logoutUserController, registerUserController, getCurrentUserController } from "../controllers/users.controllers.js"
import { registerValidations, loginValidations } from "../validations/users.validations.js"
import { validateRequest } from "../middlewares/validateRequest.js"
import { authMiddleware } from "../middlewares/authMiddleware.js"
const router = Router()

router.post("/signup", registerValidations, validateRequest, registerUserController)
router.post("/signin", loginValidations, validateRequest, loginUserController)
router.post("/logout", authMiddleware, logoutUserController)
router.get("/currentUser", authMiddleware, getCurrentUserController)

export default router
