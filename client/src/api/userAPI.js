import axiosInstance from "../utils/axiosInstance";

export const registerUserApi = async (data) => {
    const res = await axiosInstance.post("/api/users/signup", data)
    return res.data?.data
}
export const loginUserApi = async (data) => {
    const res = await axiosInstance.post("/api/users/signin", data)
    return res.data

}
export const getCurrentUser = async () => {
    const res = await axiosInstance.get("/api/users/currentUser")
    return res.data
}
export const logoutUserApi = async () => {
    const res = await axiosInstance.post("/api/users/logout")
    return res.data
}
export const upadteUserProfileApi = async (data) => {
    // console.log(data)
    const res = await axiosInstance.patch("/api/users/updateDetails", data)
    return res.data.data
}
export const updatePasswordApi = async (data) => {
    const res = await axiosInstance.patch("/api/users/updatePassword", data)
    console.log("api:", res.data.data)
    return res.data.data
}
export const forgotPasswordApi = async (email) => {
    const res = await axiosInstance.patch("/api/users/forgetPassword", { email })
    return res.data
}
export const resetPasswordApi = async (token, newPassword) => {
    const res = await axiosInstance.patch(`/api/users/resetPassword?token=${token}`, {
        newPassword,
    })
    return res.data
}

export const addAddressApi = async (data) => {
    const res = await axiosInstance.post("/api/users/checkout", data)
    return res.data.data
}