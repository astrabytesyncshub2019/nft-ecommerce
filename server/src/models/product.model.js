import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String, required: true, trim: true, maxlength: 100
        },
        description: {
            type: String, maxlength: 1000, trim: true
        },
        price: {
            type: Number, required: true, min: 0
        },
        discount: {
            type: Number, default: 0, min: 0, max: 100
        },
        category: {
            type: String, required: true, enum: ["backpacks", "luggage", "duffles"]
        },
        images: [
            { url: { type: String, required: true }, alt: String }
        ],
        createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true }
    },
    { timestamps: true }
)

const productModel = mongoose.model("product", productSchema)
export default productModel
