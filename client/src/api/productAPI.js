import axiosInstance from "../utils/axiosInstance.js";


export const getAllProducts = async () => {
  const res = await axiosInstance.get("/api/products/")
  return res.data.data || []
}

export const getProductsByCategory = async (category) => {
  const res = await axiosInstance.get(`/api/products/category/${category}`)
  return res.data.data || []
}

