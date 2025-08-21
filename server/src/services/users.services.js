import { createUser, findUserByEmail, updateRefreshToken } from "../dao/users.dao.js"
import userModel from "../models/users.models.js"
import { AppError, BadRequestError, ConflictError } from "../utils/errorHandler.js"
import { signRefreshToken, signToken } from "../utils/signToken.js"

export const registerUserService = async (fullname, email, password, phonenumber, address, role) => {
    const userAlreadyExists = await findUserByEmail(email)
    if (userAlreadyExists) throw new ConflictError("User alredy exists")

    const newUser = await createUser(fullname, email, password, phonenumber, address, role)
    if (!newUser) throw new AppError("User creation Failed")

    const token = await signToken({ id: newUser._id, email: newUser.email })
    if (!token) throw new AppError("Token generations is failed")

    const refreshToken = await signRefreshToken({ id: newUser._id, email: newUser.email })
    // console.log(refreshToken)            
    if (!refreshToken) throw new AppError("Refresh Token Generations is failed ")

    const updatedUser = await updateRefreshToken(newUser._id, refreshToken)
    newUser.refreshToken = refreshToken
    // console.log(newUser)

    return { newUser: updatedUser, token, refreshToken }

}

export const loginUserService = async (email, password) => {
    const existingUser = await findUserByEmail(email)
    if (!existingUser) throw new BadRequestError("Invalid email or password")

    const isPasswordValid = await existingUser.comparePassword(password)
    if (!isPasswordValid) throw new BadRequestError("Invalid user or password")

    const token = await signToken({ id: existingUser._id, email: existingUser.email })
    if (!token) throw new AppError("Token Generations is failed")

    const refreshToken = await signRefreshToken({ id: existingUser._id, email: existingUser.email })
    if (!refreshToken) throw new AppError("Refresh Token Generations is Failed ")

    const updatedUser = await updateRefreshToken(existingUser._id, refreshToken)

    return { existingUser: updatedUser, token, refreshToken }


}
