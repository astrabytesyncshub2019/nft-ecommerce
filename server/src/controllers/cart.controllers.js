import { findProductById } from "../dao/products.dao.js";
import { errorResponse, successResponse } from "../utils/response.js";
import { cartServices, removeCartProductServices, incrementCartProductServices, decrementCartProductServices, deleteCartServices } from "../services/cart.services.js";
import { getAllCartProducts } from "../dao/cart.dao.js"

export const cartController = async (req, res, next) => {
    try {
        const productId = req.params.productId;
        if (!productId) return errorResponse(res, "Product id is required", 400);

        const product = await findProductById(productId);
        if (!product) return errorResponse(res, "Product not found", 404);

        const updatedCart = await cartServices(req.user, productId);
        // console.log(updatedCart) 

        return successResponse(res, "Product added to cart successfully", updatedCart, 200);
    } catch (error) {
        next(error);
    }
}

export const getCartProducts = async (req, res, next) => {
    try {
        const userId = req.user._id
        const cartProducts = await getAllCartProducts(userId)
        // console.log(cartProducts)

        if (!cartProducts) return errorResponse(res, "Cart is empty", 404)
        return successResponse(res, "cart products fetched successfully", cartProducts)

    } catch (error) {
        next(error)

    }

}

export const removeCartProductController = async (req, res, next) => {
    try {
        const currentUserId = req.user?.id
        // console.log(currentUserId)
        const productId = req.params?.productId
        if (!productId) return errorResponse(res, "Product Id is required", 400)

        const cart = await removeCartProductServices(currentUserId, productId)
        if (cart) return successResponse(res, "Product from cart", cart, 200)
        return errorResponse(res, "Remove product from cart is failed")


    } catch (error) {
        next(error)

    }

}

export const incrementCartProductController = async (req, res, next) => {
    try {
        const currentUser = req.user?.id
        const produtId = req.params?.productId

        if (!produtId) return errorResponse(res, "Product Id is required", 400)

        const cart = await incrementCartProductServices(currentUser, produtId)
        return successResponse(res, "Product quantity increased", cart, 200)


    } catch (error) {
        next(error)

    }

}
export const decrementCartProductController = async (req, res, next) => {
    try {
        const currentUser = req.user?.id
        const productId = req.params?.productId
        // console.log(productId)
        if (!productId) return errorResponse(res, "Product Id is required", 400)
        const cart = await decrementCartProductServices(currentUser, productId)

        return successResponse(res, "Product quantity decreased", cart, 200)

    } catch (error) {
        next(error)

    }

}

export const deleteCartController = async (req, res, next) => {
    try {
        const currentUser = req.user?.id
        const deletedCart = await deleteCartServices(currentUser)
        if (!deletedCart) return errorResponse(res, "Cart deletion failed", 400)
        return successResponse(res, "Cart deleted succesfully", deletedCart, 200)

    } catch (error) {

    }

}
