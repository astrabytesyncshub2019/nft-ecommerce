import { addProductToCart, removeProductFromCart, incrementProductOfCart, decrementProductOfCart } from "../dao/cart.dao.js";

export const cartServices = async (currentUser, productId) => {
    return await addProductToCart(currentUser._id, productId);
}

export const removeCartProductServices = async (currentUserId, productId) => {
    return await removeProductFromCart(currentUserId, productId)
}

export const incrementCartProductServices = async (currentUserId, productId) => {
    return await incrementProductOfCart(currentUserId, productId)

}

export const decrementCartProductServices = async (currentUserId,productId) => {
    return await decrementProductOfCart(currentUserId, productId)

}