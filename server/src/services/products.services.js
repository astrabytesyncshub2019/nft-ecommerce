import { createProducts, getAllProducts } from "../dao/products.dao.js"
import { AppError } from "../utils/errorHandler.js"

export const createProductsServices = async (name, description, price, discount, images) => {

    const createdProduct = await createProducts(name, description, price, discount, images)
    if (!createdProduct) throw new AppError("Product is not created")

    return createdProduct

}

export const getAllProductsService = async (page,limit) => {
   const allProducts = await getAllProducts(page, limit)
    if (!allProducts) {
        throw new AppError("Fecthing products unsuccessfull")
    }
    else if (allProducts.length === 0) {
        throw new AppError("No products found", 404)
    }

    return allProducts

}