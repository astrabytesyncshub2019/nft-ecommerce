import userModel from "../models/users.models.js"

export const createUser = async (fullname, email, password, phonenumber, address, role, refreshToken) => {
    const userData = {
        fullname: {
            firstname: fullname.firstname,
            lastname: fullname.lastname
        },
        email,
        password,
        phonenumber,
        address,
        refreshToken
    }

    if (role) userData.role = role
    console.log(role)

    return await userModel.create(userData)
}

export const findUserByEmail = async (email) => {
    return await userModel.findOne({ email })
}

export const updateRefreshToken = async (userId, refreshToken) => {
    return await userModel.findByIdAndUpdate(
        userId,
        { refreshToken },
        { new: true }
    )
}

export const findUserById = async (id, includePassword = false) => {
    if (includePassword) {
        return await userModel.findById(id).select("+password")
    }
    return await userModel.findById(id).select("-password")
}

export const updateUserDeatils = async (currentUser, allowedUserUpdateDetails) => {
    return await userModel.findByIdAndUpdate(
        currentUser,
        { $set: allowedUserUpdateDetails },
        { new: true, runValidators: true }
    )
}

export const findUserByResetToken = async (hashedToken) => {
    return await userModel.findOne({
        resetPasswordToken: hashedToken,
        resetPasswordExpire: { $gt: Date.now() }
    }).select("+password")
}

export const saveUser = async (user) => {
    return await user.save()
}
