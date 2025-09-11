import axiosInstance from "../utils/axiosInstance";

export const addToCart = async (productId) => {
    const res = await axiosInstance.post(`/api/cart/${productId}`)
    return res.data?.data || []

}

export const getCartProducts = async () => {
    const res = await axiosInstance.get("/api/cart/")
    return res.data?.data?.items || []
}

export const deleteCart = async () => {
    const res = await axiosInstance.delete("api/cart/deleteCart")
    return res.data?.data || []
}

export const removeProductFormCart = async (productId) => {
    const res = await axiosInstance.delete(`api/cart/${productId}`)
    return res.data?.data || []

}

export const incrementCartProduct = async (productId) => {
    const res = await axiosInstance.patch(`api/cart/increment/${productId}`)
    return res.data?.data || []

}

export const decrementProductFromCart = async (productId) => {
    const res = await axiosInstance.patch(`/api/cart/decrement/${productId}`)
    return res.data?.data || []
}
