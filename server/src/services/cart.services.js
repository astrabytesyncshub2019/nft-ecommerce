import { addProductToCart ,removeProductFromCart} from "../dao/cart.dao.js";

export const cartServices = async (currentUser, productId) => {
    return await addProductToCart(currentUser._id, productId);
}

export const removeCartProductServices = async (currentUserId, productId) => {
    return await removeProductFromCart(currentUserId, productId)
}
