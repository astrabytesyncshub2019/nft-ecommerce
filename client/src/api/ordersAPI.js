import axiosInstance from "../utils/axiosInstance";

export const palceOrderApi = async (addressId, productId = null, quantity = 1) => {
    const res = await axiosInstance.post("/api/order", {
        address: addressId,
        productId,
        quantity
    })
    return res.data
}

export const getUserOrdersApi = async () => {
    const res = await axiosInstance.get("/api/order")
    return res.data.data
}

export const getAllOrdersApi = async () => {
    const res = await axiosInstance.get("/api/order/all")
    return res.data.data
}
export const getAllOrdersStatus = async () => {
    const res = await axiosInstance.get("/api/order/:orderId/status")
    return res.data.data
}