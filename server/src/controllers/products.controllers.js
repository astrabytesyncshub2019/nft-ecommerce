import { createProductsServices, getAllProductsService, updateProductServices } from "../services/products.services.js"
import { errorResponse, successResponse } from "../utils/response.js"

export const productsController = async (req, res, next) => {
    try {
        const { name, description, price, discount, category } = req.body
        // console.log("cat:",category)
        const createdBy = req.user._id;
        // console.log(createdBy)
        if (!req.file) return errorResponse(res, "At least one file is required", 400)

        // const image = { url: `/uploads/${req.file.filename}` }
        const image = {
            url: `/uploads/${req.file.filename}`,
            hash: req.file.hash
        }
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

export const updateProductController = async (req, res, next) => {
    try {
        const productId = req.params.productId
        const { name, description, price, discount, category } = req.body

        const updateFields = { name, description, price, discount, category }

        if (req.file) {
            updateFields.image = {
                url: `/uploads/${req.file.filename}`,
                hash: req.file.hash
            }
        }

        const updatedProduct = await updateProductServices(productId, updateFields)

        if (!updatedProduct) {
            return errorResponse(res, updatedProduct.message, 400)
        }

        return successResponse(res, "Product updated successfully", updatedProduct, 200)
    } catch (error) {
        next(error)
    }
}


