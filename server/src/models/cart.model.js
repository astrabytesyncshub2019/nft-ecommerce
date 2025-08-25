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
    delete ret.__v
    delete ret.user
    delete ret.createdAt
    delete ret.updatedAt

    ret.items = ret.items
      .filter(item => item.product)
      .map(item => {
        const product = item.product
        return {
          productId: product._id,
          name: product.name,
          price: product.price,
          discount: product.discount,
          category: product.category,
          image: product.image?.url,
          quantity: item.quantity
        }
      })

    return ret
  }
})

const Cart = mongoose.model("Cart", cartSchema)
export default Cart
