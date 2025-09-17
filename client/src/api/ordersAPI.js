import axiosInstance from "../utils/axiosInstance";

export const palceOrderApi = async (addressId, productId = null, quantity = 1) => {
    const res = await axiosInstance.post("/api/order", {
        address: addressId,
        productId,
        quantity
    })
    return res.data
}

