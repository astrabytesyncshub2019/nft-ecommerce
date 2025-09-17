import { findCartByUser } from "../dao/cart.dao.js"
import { createOrder, findOrdersByUser, findAllOrders, updateOrderStatus } from "../dao/order.dao.js"
import Cart from "../models/cart.model.js"
import productModel from "../models/product.model.js"
import { BadRequestError } from "../utils/errorHandler.js"


export const placeCartOrderService = async (userId, addressId) => {
    const cart = await findCartByUser(userId)
    const products = await cart.populate("items.product")
    // console.log(products)
    if (!products || products.length === 0) throw new BadRequestError("Cart is empty")

    for (const item of products.items) {
        if (item.quantity > item.product.stock) {
            throw new BadRequestError(
                `Not enough stock for ${item.product.name}. Available: ${item.product.stock}`
            )
        }
    }

    const orderItems = products.items.map((item) => ({
        product: item.product._id,
        name: item.product.name,
        price: item.product.price,
        discount: item.product.discount,
        quantity: item.quantity
    }))

    const totalAmount = orderItems.reduce(
        (sum, item) => sum + (item.price - item.discount) * item.quantity,
        0
    )
    for (const item of products.items) {
        await productModel.findByIdAndUpdate(item.product._id, {
            $inc: { stock: -item.quantity }
        })
    }

    const order = await createOrder({
        user: userId,
        items: orderItems,
        shippingAddress: addressId,
        totalAmount,
        paymentMethod: "COD",
        status: "pending"
    })

    cart.items = []
    await cart.save()

    return order
}
export const placeSingleOrderService = async (userId, productId, quantity, addressId) => {
    const product = await productModel.findById(productId)
    if (!product) throw new BadRequestError("Product not found")
    if (quantity > product.stock) {
        throw new BadRequestError(`Not enough stock for ${product.name}. Available: ${product.stock}`)
    }

    const orderItem = {
        product: product._id,
        name: product.name,
        price: product.price,
        discount: product.discount,
        quantity
    }

    const totalAmount = (product.price - product.discount) * quantity

    // reduce stock
    await productModel.findByIdAndUpdate(product._id, {
        $inc: { stock: -quantity }
    })

    await Cart.updateOne(
        { user: userId },
        { $pull: { items: { product: productId } } }
    )

    const order = await createOrder({
        user: userId,
        items: [orderItem],
        shippingAddress: addressId,
        totalAmount,
        paymentMethod: "COD",
        status: "pending"
    })

    return order
}




export const getUserOrdersService = async (userId) => {
    return await findOrdersByUser(userId)
}


export const getAllOrdersService = async () => {
    return await findAllOrders()
}


export const updateOrderStatusService = async (orderId, status) => {
    return await updateOrderStatus(orderId, status)
}
