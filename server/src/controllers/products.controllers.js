import imagekit from "../config/imageKit.config.js"
import { createProductsServices, deleteProductServices, getAllProductsService, updateProductServices } from "../services/products.services.js"
import { errorResponse, successResponse } from "../utils/response.js"

export const productsController = async (req, res, next) => {
    const validCategories = ["backpacks", "luggage", "duffles"]
    try {
        const { name, description, price, discount, category } = req.body
        // console.log("cat:",category)
        const createdBy = req.user._id;
        // console.log(createdBy)
        if (!req.file) return errorResponse(res, "At least one file is required", 400)
        if (!validCategories.includes(category)) {
            return errorResponse(res, "Invalid category", 400)
        }



        // Upload image to ImageKit inside "products" folder
        const uploadResponse = await imagekit.upload({
            file: req.file.buffer,             // file buffer from multer memoryStorage
            fileName: req.file.originalname,   // original filename
            folder: `/products/${category}`,   // ✅ will create nested folders automatically
            useUniqueFileName: true            // prevents overwriting files
        })

        const image = {
            url: uploadResponse.url,
            fileId: uploadResponse.fileId,
            hash: req.file.hash
        }



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
        // console.log(updatedProduct)

        if (!updatedProduct) return errorResponse(res, "Product not founded", 404)


        return successResponse(res, "Product updated successfully", updatedProduct, 200)
    } catch (error) {
        next(error)
    }
}

export const deleteProductController = async (req, res, next) => {
    try {
        const productId = req.params.productId
        const deletedProduct = await deleteProductServices(productId)
        if (!deletedProduct) return errorResponse(res, "Deletion of product failed", 400)
        return successResponse(res, "Product deleted successfully", deletedProduct, 200)

    } catch (error) {
        next(error)

    }

}


