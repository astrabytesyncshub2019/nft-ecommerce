import orderModel from "../models/order.model.js"

export const createOrder = async (orderData) => {
    return await orderModel.create(orderData)
}

export const findOrdersByUser = async (userId) => {
    return await orderModel.find({ user: userId })
        .populate("items.product", "name image")
        .populate("shippingAddress")
}

export const findAllOrders = async () => {
    return await orderModel.find()
        .populate("user", "fullname email")
        .populate("shippingAddress")
}

export const updateOrderStatus = async (orderId, status) => {
    return await orderModel.findByIdAndUpdate(
        orderId,
        { orderStatus: status },
        { new: true }
    )
}
