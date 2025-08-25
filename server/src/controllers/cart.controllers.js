import { findProductById } from "../dao/products.dao.js";
import { errorResponse, successResponse } from "../utils/response.js";
import { cartServices } from "../services/cart.services.js";

export const cartController = async (req, res, next) => {
    try {
        const productId = req.params.productId;
        if (!productId) return errorResponse(res, "Product id is required", 400);

        const product = await findProductById(productId);
        if (!product) return errorResponse(res, "Product not found", 404);

        const updatedCart = await cartServices(req.user, productId);
        // console.log(updatedCart) 

        return successResponse(res,"Product added to cart successfully",updatedCart,200);
    } catch (error) {
        next(error);
    }
};
