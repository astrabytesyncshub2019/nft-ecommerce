import mongoose from "mongoose"

const addressSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    street: {
        type: String,
        required: [true, "Street is required"]
    },
    city: {
        type: String,
        required: [true, "City is required"]
    },
    state: {
        type: String,
        required: [true, "State is required"]
    },
    postalCode: {
        type: String,
        required: [true, "Postal code is required"]
    },
    country: {
        type: String,
        required: true,
        default: "India"
    },
    landmark: String
}, { timestamps: true })


const addressModel = mongoose.model("address", addressSchema)
export default addressModel
