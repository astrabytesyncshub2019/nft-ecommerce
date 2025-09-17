import mongoose from "mongoose"

const orderSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
    items: [
        {
            product: { type: mongoose.Schema.Types.ObjectId, ref: "product", required: true },
            name: String,
            price: Number,
            discount: Number,
            quantity: { type: Number, default: 1 }
        }
    ],
    shippingAddress: { type: mongoose.Schema.Types.ObjectId, ref: "address", required: true },
    totalAmount: { type: Number, required: true },
    paymentMethod: { type: String, default: "COD" },
    status: { type: String, enum: ["pending", "completed", "cancelled"], default: "pending" }
}, { timestamps: true })

const orderModel = mongoose.model("Order", orderSchema)
export default orderModel
