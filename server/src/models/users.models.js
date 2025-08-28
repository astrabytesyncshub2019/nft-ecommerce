import mongoose from "mongoose";
import bcrypt from "bcryptjs"
import crypto from "crypto"
const userSchema = new mongoose.Schema({
    fullname: {
        firstname: {
            type: String,
            required: [true, "First name is required"],
            minlength: [3, "first name must be at least 3 charcters"],
            maxlength: [30, "First name cannot exceed 30 characters"]
        },
        lastname: {
            type: String,
            maxlength: [30, "First name cannot exceed 30 characters"]
        }
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        trim: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minlength: [6, "Password must be at least 6 charcters"],
    },
    phonenumber: {
        type: Number,
        required: [true, 'Phone number is required'],
        trim: true,
    },
    addresses: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "address"
        }
    ],
    role: {
        type: String,
        enum: ["user", "admin", "moderator"],
        default: "user"
    },
    refreshToken: {
        type: String,
        default: null
    },
    likedProducts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "product"
        }
    ],
    resetPasswordToken: String,
    resetPasswordExpire: Date,
}, { timestamps: true })

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next()
    this.password = await bcrypt.hash(this.password, 10)
    next()
})

userSchema.set("toJSON", {
    transform: (doc, ret) => {
        delete ret.password
        delete ret.__v
        return ret
    }
})

userSchema.methods.comparePassword = async function (password) {
    return bcrypt.compare(password, this.password)
}

userSchema.methods.getResetPasswordToken = async function () {
    const resetPasswordToken = await crypto.randomBytes(32).toString("hex")
    this.resetPasswordToken = crypto.createHash("sha256").update(resetPasswordToken).digest("hex")
    this.resetPasswordExpire = Date.now() + 15 * 60 * 100
    return resetPasswordToken

}
const userModel = mongoose.model("user", userSchema)
export default userModel; 