import { addProductToCart } from "../dao/cart.dao.js";

export const cartServices = async (currentUser, productId) => {
    return await addProductToCart(currentUser._id, productId);
};
