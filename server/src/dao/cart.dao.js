import Cart from "../models/cart.model.js";
import mongoose from "mongoose";

export const findCartByUser = async (userId) => {
    return await Cart.findOne({ user: userId });
};

export const addProductToCart = async (userId, productId) => {
    let cart = await findCartByUser(userId);

    if (!cart) {
        // If cart doesn't exist, create new
        cart = await Cart.create({
            user: userId,
            items: [{ product: productId, quantity: 1 }]
        });
        return cart;
    }

    // Check if product already exists in cart
    const itemIndex = cart.items.findIndex(
        item => item.product.toString() === productId.toString()
    );

    if (itemIndex > -1) {
        // Increment quantity
        cart.items[itemIndex].quantity += 1;
    } else {
        // Add new product
        cart.items.push({ product: productId, quantity: 1 });
    }

    await cart.save();
    return cart;
};
