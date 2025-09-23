import axiosInstance from "../utils/axiosInstance";

export const placeOrderApi = async (addressId, productId = null, quantity = null, paymentMethod = "COD") => {
  const body = { paymentMethod }

  if (productId) {
    body.productId = productId
    body.quantity = quantity
  }

  try {
    const response = await axiosInstance.post("/api/order", body)
    return response.data
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to place order")
  }
}

export const getUserOrdersApi = async () => {
  const res = await axiosInstance.get("/api/order/my-order")
  // console.log(res.data.data)
  return res.data.data
}

export const getAllOrdersApi = async () => {
  const res = await axiosInstance.get("/api/order/all")
  return res.data.data
}

export const initiatePaymentApi = async (items,orderId) => {
  const res = await axiosInstance.post("/api/payment", {
    items,
    orderId
  })
  // console.log(res.data)
  return res
}