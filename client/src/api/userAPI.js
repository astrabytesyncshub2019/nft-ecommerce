import axiosInstance from "../utils/axiosInstance";

export const registerUserApi = async (data) => {
    const res = await axiosInstance.post("/api/users/signup", data)
    return res.data.data
}
export const loginUserApi = async (data) => {
    const res = await axiosInstance.post("/api/users/signin", data)
    return res.data

}
export const getCurrentUser = async () => {
    const res = await axiosInstance.get("/api/users/currentUser")
    return res.data
}