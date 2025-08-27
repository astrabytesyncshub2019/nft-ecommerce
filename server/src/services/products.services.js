import { createProducts, deleteProduct, getAllProducts, updateProduct } from "../dao/products.dao.js"
import { AppError, NotFoundError } from "../utils/errorHandler.js"

export const createProductsServices = async (name, description, price, discount, category, image, createdBy) => {

    const createdProduct = await createProducts(name, description, price, discount, category, image, createdBy)
    if (!createdProduct) throw new AppError("Product is not created")

    return createdProduct

}

export const getAllProductsService = async (page, limit) => {
    const allProducts = await getAllProducts(page, limit)
    if (!allProducts) {
        throw new AppError("Fecthing products unsuccessfull")
    }
    else if (allProducts.length === 0) {
        throw new AppError("No products founded", 404)
    }

    return allProducts

}

export const updateProductServices = async (productId, updateFields) => {
    const updatedProduct = await updateProduct(productId, updateFields)

    if (!updatedProduct) throw new NotFoundError("Product not founded")
    return updatedProduct

}

export const deleteProductServices = async (productId) => {
    const deletedProduct = await deleteProduct(productId)
    if (!deletedProduct) return new NotFoundError("Product not founded")
    return deletedProduct

}

