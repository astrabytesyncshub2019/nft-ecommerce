import { createProductsServices, getAllProductsService } from "../services/products.services.js"
import { successResponse } from "../utils/response.js"

export const productsController = async (req, res, next) => {
    try {
        const { name, description, price, discount } = req.body
        const image = req.file ? `/uploads/${req.file.filename}` : null
        const createdProduct = createProductsServices(name, description, price, discount, image)

        return successResponse(res, "Product is created ", createdProduct, 201)

    } catch (error) {
        next(error)
    }

}


export const getAllProductsController = async (req, res, next) => {
    try {
        const allProducts = await getAllProductsService()
        return successResponse(res, "All products are fecthed successfully", allProducts, 200)
    } catch (error) {
        next(error)

    }

}