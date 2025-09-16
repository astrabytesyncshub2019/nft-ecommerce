import { createProducts, deleteProduct, findProductById, getAllProducts, updateProduct } from "../dao/products.dao.js"
import { AppError, NotFoundError } from "../utils/errorHandler.js"
import imagekit from "../config/imageKit.config.js"
import Cart from "../models/cart.model.js"

export const createProductsServices = async (name, description, price, discount, category, image, createdBy, stock) => {
    const createdProduct = await createProducts(name, description, price, discount, category, image, createdBy, stock)
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
    const product = await findProductById(productId)
    if (!product) throw new NotFoundError("Product not found")
    if (product.image?.fileId) {
        try {
            await imagekit.deleteFile(product.image.fileId)
        } catch (err) {
            console.error("Failed to delete image from ImageKit:", err.message)
        }
    }
    const deletedProduct = await deleteProduct(productId)
    await Cart.updateMany(
        { "items.product": productId },
        { $pull: { items: { product: productId } } }
    )
    return deletedProduct
}

