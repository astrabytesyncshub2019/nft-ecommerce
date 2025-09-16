import imagekit from "../config/imageKit.config.js"
import { findProductsByCategory, getAllProducts } from "../dao/products.dao.js"
import { createProductsServices, deleteProductServices, getAllProductsService, updateProductServices } from "../services/products.services.js"
import { errorResponse, successResponse } from "../utils/response.js"

export const productsController = async (req, res, next) => {
    const validCategories = ["backpacks", "luggage", "duffles"]
    try {
        const { name, description, price, discount, category, stock } = req.body
        const createdBy = req.user._id;
        if (!req.file) return errorResponse(res, "At least one file is required", 400)
        if (!validCategories.includes(category)) {
            return errorResponse(res, "Invalid category", 400)
        }
        const uploadResponse = await imagekit.upload({
            file: req.file.buffer,
            fileName: req.file.originalname,
            folder: `/products/${category}`,
            useUniqueFileName: true
        })

        const image = {
            url: uploadResponse.url,
            fileId: uploadResponse.fileId,
            hash: req.file.hash
        }



        const createdProduct = await createProductsServices(name, description, price, discount, category, image, createdBy, stock)

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
        const { name, description, price, discount, category } = req.body || {}

        const updateFields = {}
        if (name) updateFields.name = name
        if (description) updateFields.description = description
        if (price) updateFields.price = price
        if (discount) updateFields.discount = discount
        if (category) updateFields.category = category

        if (req.file) {
            const uploadResult = await imagekit.upload({
                file: req.file.buffer,
                fileName: req.file.originalname,
                folder: `/products/${category}`,
            })

            updateFields.image = {
                url: uploadResult.url,
                fileId: uploadResult.fileId,
                hash: req.file.hash
            }
        }

        const updatedProduct = await updateProductServices(productId, updateFields)
        if (!updatedProduct) return errorResponse(res, "Product not found", 404)

        return successResponse(res, "Product updated successfully", updatedProduct, 200)
    } catch (error) {
        next(error)
    }
}



export const deleteProductController = async (req, res, next) => {
    try {
        const productId = req.params.productId
        const deletedProduct = await deleteProductServices(productId)
        if (!deletedProduct) {
            return errorResponse(res, "Deletion of product failed", 400)
        }
        return successResponse(res, "Product deleted successfully", deletedProduct, 200)
    } catch (error) {
        next(error)
    }
}

export const getProductsByCategoryController = async (req, res, next) => {
    try {
        const category = req.params
        let products

        if (category) {
            products = await findProductsByCategory(category)
            if (!products || products.length === 0) {
                return successResponse(res, "No products found for this category", [], 200)
            }
        } else {
            d
            products = await getAllProducts()
        }

        return successResponse(res, "Products fetched successfully", products, 200)
    } catch (error) {
        next(error)
    }
}


