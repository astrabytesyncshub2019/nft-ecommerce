import { cookieOptionsForAcessToken, cookieOptionsForRefreshToken } from "../config/cookieOptions.js"
import { findUserById, updateRefreshToken } from "../dao/users.dao.js"
import { loginUserService, registerUserService } from "../services/users.services.js"
import { NotFoundError, UnauthorizedError } from "../utils/errorHandler.js"
import { errorResponse, successResponse } from "../utils/response.js"


export const registerUserController = async (req, res, next) => {
    try {
        const { fullname, email, password, phonenumber, address, role } = req.body
        const { newUser, token, refreshToken } = await registerUserService(fullname, email, password, phonenumber, address, role)

        res.cookie("accessToken", token, cookieOptionsForAcessToken)
        res.cookie("refreshToken", refreshToken, cookieOptionsForRefreshToken)
        req.user = newUser

        return successResponse(res, "User registed successfully", newUser, 201)
    } catch (error) {
        next(error)

    }
}

export const loginUserController = async (req, res, next) => {
    try {
        const { email, password } = req.body
        const { existingUser, token, refreshToken } = await loginUserService(email, password)

        res.cookie("accessToken", token, cookieOptionsForAcessToken)
        res.cookie("refreshToken", refreshToken, cookieOptionsForRefreshToken)
        req.user = existingUser
        console.log(req.user.id)

        return successResponse(res, "User Login successfully", existingUser, 200)

    } catch (error) {
        next(error)
    }

}

export const logoutUserController = async (req, res, next) => {
    try {
        if (req.user?.id) {
            await updateRefreshToken(req.user.id, null)
        }
        res.clearCookie("accessToken", cookieOptionsForAcessToken)
        res.clearCookie("refreshToken", cookieOptionsForRefreshToken)

        return successResponse(res, "Logout succesfull", 200)
    } catch (error) {
        next(error)
    }

}

export const getCurrentUserController = async (req, res, next) => {
    try {
        if (!req.user || !req.user._id) {
            return errorResponse(res, "Unauthorized user", null, 401)
        }

        const currentUser = await findUserById(req.user._id)
        return successResponse(res, "Current user fetched successfully", currentUser, 200)

    } catch (error) {
        next(error)
    }
}
