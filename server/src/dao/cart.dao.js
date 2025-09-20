import Cart from "../models/cart.model.js";
import productModel from "../models/product.model.js";
import { AppError, BadRequestError, NotFoundError } from "../utils/errorHandler.js";

export const findCartByUser = async (userId, session = null) => {
    const query = Cart.findOne({ user: userId });
    if (session) query.session(session);
    return await query;
};

export const addProductToCart = async (userId, productId, session = null) => {
    let cart = await findCartByUser(userId, session);

    if (!cart) {
        // If cart doesn't exist, create new
        cart = await Cart.create(
            [{ user: userId, items: [{ product: productId, quantity: 1 }] }],
            { session }
        );
        return cart[0]; // Create returns an array
    }

    const itemIndex = cart.items.findIndex(
        item => item.product.toString() === productId.toString()
    );

    if (itemIndex > -1) {
        cart.items[itemIndex].quantity += 1;
    } else {
        cart.items.push({ product: productId, quantity: 1 });
    }

    await cart.save({ session });
    return cart;
};

export const getAllCartProducts = async (userId, session = null) => {
    const query = Cart.findOne({ user: userId }).populate({
        path: "items.product",
        select: "name description price image category discount stock"
    });
    if (session) query.session(session);
    return await query;
};

export const removeProductFromCart = async (currentUserId, productId, session = null) => {
    const query = Cart.findOneAndUpdate(
        { user: currentUserId },
        { $pull: { items: { product: productId } } },
        { new: true }
    ).populate("items.product");
    if (session) query.session(session);
    return await query;
};

export const incrementProductOfCart = async (currentUserId, productId, session = null) => {
    const cart = await Cart.findOne({ user: currentUserId, "items.product": productId }, null, { session });
    if (!cart) throw new NotFoundError("Product not found in cart", 404);

    const product = await productModel.findById(productId, null, { session });
    if (!product) throw new NotFoundError("Product not found", 404);

    cart.items = cart.items.map(item => {
        if (item.product.toString() === productId) {
            const newQty = item.quantity + 1;
            if (newQty > product.stock) {
                throw new BadRequestError(`Only ${product.stock} items available in stock`);
            }
            item.quantity = newQty;
        }
        return item;
    });

    await cart.save({ session });
    return cart;
};

export const decrementProductOfCart = async (currentUserId, productId, session = null) => {
    const cart = await Cart.findOne({ user: currentUserId, "items.product": productId }, null, { session });
    if (!cart) throw new NotFoundError("Product not found in cart", 404);

    cart.items = cart.items.filter(item => {
        if (item.product.toString() === productId) {
            const newQty = item.quantity - 1;
            if (newQty > 0) {
                item.quantity = newQty;
                return true;
            }
            return false;
        }
        return true;
    });

    await cart.save({ session });
    return cart;
};

export const deleteCart = async (currentUserId, session = null) => {
    const query = Cart.findOneAndDelete({ user: currentUserId });
    if (session) query.session(session);
    return await query;
};