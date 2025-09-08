import axiosInstance from "../utils/axiosInstance.js";


export const getAllProducts = async () => {
  const res = await axiosInstance.get("/api/products/")
  return res.data.data || [] 
}