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
            type: Number, default: 0, min: 0
        },
        category: {
            type: String, required: true, enum: ["backpacks", "luggage", "duffles"]
        },
        image: {
            url: { type: String, required: false },
            hash: { type: String, required: false },
            fileId: { type: String }
        },
        createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true }
    },
    { timestamps: true }
)


productSchema.set("toJSON", {
    transform: (doc, ret) => {
        delete ret.__v
        delete ret.image.hash
        delete ret.createdBy
        delete ret.createdAt
        delete ret.updatedAt
        return ret
    }
})


const productModel = mongoose.model("product", productSchema)
export default productModel
