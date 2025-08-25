import mongoose from "mongoose"

const cartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "product",
          required: true,
        },
        quantity: {
          type: Number,
          default: 1,
          min: [1, "Quantity cannot be less than 1"],
        },
      },
    ],
  },
  { timestamps: true }
)

cartSchema.set("toJSON", {
  transform: (doc, ret) => {
    delete ret.__v,
    ret.items.forEach(item => delete item._id);
    return ret;

  }
})
const Cart = mongoose.model("Cart", cartSchema)
export default Cart
