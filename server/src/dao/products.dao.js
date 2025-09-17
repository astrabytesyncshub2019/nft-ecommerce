import { hash } from "crypto"
import productModel from "../models/product.model.js"
export const createProducts = async (name, description, price, discount, category, image, createdBy, stock) => {

  const product = await productModel.create({
    name,
    description,
    price,
    discount,
    category,
    image,
    createdBy,
    stock
  })

  return product

}



export const getAllProducts = async (page = 1, limit = 10) => {
  // const skip = (page - 1) * limit
  const products = await productModel.find()
  return products
}


export const findProductByImageHash = async (hash) => {
  return await productModel.findOne({ "image.hash": hash })
}

export const findProductById = async (productId) => {
  return await productModel.findById(productId)

}

export const updateProduct = async (productId, updateFields) => {
  return await productModel.findByIdAndUpdate(
    productId,
    { $set: updateFields },
    { new: true, runValidators: true }
  )
}

export const deleteProduct = async (productId) => {
  return await productModel.findByIdAndDelete(productId)

}

export const findProductsByCategory = async (category) => {
  return await productModel.find(category)

}

