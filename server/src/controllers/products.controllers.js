import { createProductsServices, getAllProductsService } from "../services/products.services.js"
import { errorResponse, successResponse } from "../utils/response.js"

export const productsController = async (req, res, next) => {
    try {
        const { name, description, price, discount, category } = req.body
        // console.log("cat:",category)
        const createdBy = req.user._id;
        // console.log(createdBy)
        if (!req.file) return errorResponse(res, "At least one file is required", 400)

        const image = { url: `/uploads/${req.file.filename}` }
        // console.log(image)

        const createdProduct = await createProductsServices(name, description, price, discount, category, image, createdBy)

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