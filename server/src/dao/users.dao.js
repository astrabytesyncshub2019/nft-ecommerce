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

export const findUserById = async (id) => {
    return await userModel.findById(id).select("-password")
}