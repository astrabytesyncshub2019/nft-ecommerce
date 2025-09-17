import { getUserOrdersService, updateOrderStatusService, placeSingleOrderService, placeCartOrderService } from "../services/order.services.js"
import { NotFoundError } from "../utils/errorHandler.js"
import { errorResponse, successResponse } from "../utils/response.js"

export const placeOrderController = async (req, res, next) => {
  try {
    const shippingAddress = req.user.addresses?.[0]
    // console.log("shipping address",shippingAddress)

    if (!shippingAddress) return NotFoundError("Address not found")
    const { productId, quantity } = req.body
    let order
    if (productId) {
      order = await placeSingleOrderService(req.user._id, productId, quantity || 1, shippingAddress._id)
    } else {
      order = await placeCartOrderService(req.user._id, shippingAddress._id)
    }

    return successResponse(res, "Order placed successfully", order, 201)
  } catch (err) {
    next(err)
  }
}

export const getUserOrdersController = async (req, res, next) => {
  try {
    const orders = await getUserOrdersService(req.user._id)
    return successResponse(res, "User orders fetched", orders)
  } catch (err) {
    next(err)
  }
}


export const getAllOrdersController = async (req, res, next) => {
  try {
    const orders = await getAllOrdersService()
    return successResponse(res, "All orders fetched", orders)
  } catch (err) {
    next(err)
  }
}

export const updateOrderStatusController = async (req, res, next) => {
  try {
    const { orderId } = req.params
    const { status } = req.body
    const order = await updateOrderStatusService(orderId, status)
    return successResponse(res, "Order status updated", order)
  } catch (err) {
    next(err)
  }
}
