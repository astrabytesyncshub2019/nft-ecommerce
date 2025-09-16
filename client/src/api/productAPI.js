import axiosInstance from "../utils/axiosInstance.js";


export const getAllProducts = async () => {
  const res = await axiosInstance.get("/api/products/")
  return res.data.data || []
}

export const getProductsByCategory = async (category) => {
  const res = await axiosInstance.get(`/api/products/category/${category}`)
  return res.data.data || []
}

export const createProductApi = async (product) => {
  const res = await axiosInstance.post("/api/products/createProducts", product)
  return res.data.data
}

export const updateProductApi = async (productId, formData) => {
  const res = await axiosInstance.patch(`/api/products/${productId}`, formData)
  return res.data
}
export const deleteProductApi = async (productId) => {
  const res = await axiosInstance.delete(`/api/products/${productId}`)
  return res.data.data
}

