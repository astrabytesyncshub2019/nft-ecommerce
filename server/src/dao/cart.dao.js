import Cart from "../models/cart.model.js";
import { AppError, NotFoundError } from "../utils/errorHandler.js"

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

    const itemIndex = cart.items.findIndex(
        item => item.product.toString() === productId.toString()
    );

    if (itemIndex > -1) {

        cart.items[itemIndex].quantity += 1;
    } else {
        cart.items.push({ product: productId, quantity: 1 });
    }

    await cart.save();
    return cart;
}

export const getAllCartProducts = async (userId) => {
    return await Cart.findOne({ user: userId })
        .populate({
            path: "items.product",
            select: "name description price image category discount"
        })

}

export const removeProductFromCart = async (currentUSerId, productId) => {
    return await Cart.findOneAndUpdate(
        { user: currentUSerId },
        { $pull: { items: { product: productId } } },
        { new: true }
    ).populate("items.product")
}

export const incrementProductOfCart = async (currentUserId, productId) => {
    const cart = await Cart.findOne({ user: currentUserId, "items.product": productId })

    if (!cart) throw new NotFoundError("Product not found in cart", 404)

    cart.items.map(item => {
        if (item.product.toString() === productId) {
            item.quantity += 1
        }
        return item;
    });

    await cart.save()
    return cart

}

export const decrementProductOfCart = async (currentUserId, productId) => {
    const cart = await Cart.findOne({ user: currentUserId, "items.product": productId })
    if (!cart) throw new NotFoundError("Product not found in cart", 404)

    cart.items.map(item => {
        if (item.product.toString() === productId) {
            item.quantity -= 1
        }
        return item
    })
    await cart.save()
    return cart

}
