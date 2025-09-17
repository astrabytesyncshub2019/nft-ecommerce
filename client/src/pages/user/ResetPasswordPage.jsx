import React, { useState } from "react"
import { useSearchParams, useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as Yup from "yup"
import toast from "react-hot-toast"
import { resetPasswordApi } from "../../api/userAPI"
import { Eye, EyeOff } from "lucide-react"

// Validation schema
const schema = Yup.object({
    newPassword: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("New password is required"),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
        .required("Confirm password is required"),
})

const ResetPassword = () => {
    const [searchParams] = useSearchParams()
    const navigate = useNavigate()
    const token = searchParams.get("token")

    const [showPassword, setShowPassword] = useState({
        new: false,
        confirm: false,
    })

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    })

    const onSubmit = async (data) => {
        if (!token) {
            toast.error("Invalid or missing token")
            return
        }

        try {
            const res = await resetPasswordApi(token, data.newPassword)
            toast.success(res.message || "Password reset successful")
            navigate("/auth") // redirect after success
        } catch (error) {
            toast.error(error?.response?.data?.message || "Failed to reset password")
        }
    }

    if (!token) {
        return (
            <div className="w-full min-h-screen flex items-center justify-center">
                <p className="text-red-600 text-lg">Invalid or missing reset token.</p>
            </div>
        )
    }

    return (
        <div className="w-full min-h-screen bg-[#f2f2f2] flex items-center justify-center">
            <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-2 text-[var(--heading-color)] text-center">
                    Reset Password
                </h2>
                <p className="text-zinc-700 mb-6 text-center">
                    Enter your new password below
                </p>

                <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                    {/* New Password */}
                    <div className="w-full">
                        <label className="block text-sm font-medium mb-1">New Password</label>
                        <div className="flex items-center border border-gray-300 rounded-lg px-3">
                            <input
                                type={showPassword.new ? "text" : "password"}
                                {...register("newPassword")}
                                className="w-full px-3 py-2 outline-none rounded-lg"
                                placeholder="Enter new password"
                            />
                            <span
                                className="text-gray-500 cursor-pointer"
                                onClick={() => setShowPassword(prev => ({ ...prev, new: !prev.new }))}
                            >
                                {showPassword.new ? <EyeOff /> : <Eye />}
                            </span>
                        </div>
                        {errors.newPassword && (
                            <p className="text-red-600 text-xs">{errors.newPassword.message}</p>
                        )}
                    </div>

                    {/* Confirm Password */}
                    <div className="w-full">
                        <label className="block text-sm font-medium mb-1">Confirm Password</label>
                        <div className="flex items-center border border-gray-300 rounded-lg px-3">
                            <input
                                type={showPassword.confirm ? "text" : "password"}
                                {...register("confirmPassword")}
                                className="w-full px-3 py-2 outline-none rounded-lg"
                                placeholder="Confirm new password"
                            />
                            <span
                                className="text-gray-500 cursor-pointer"
                                onClick={() =>
                                    setShowPassword(prev => ({ ...prev, confirm: !prev.confirm }))
                                }
                            >
                                {showPassword.confirm ? <EyeOff /> : <Eye />}
                            </span>
                        </div>
                        {errors.confirmPassword && (
                            <p className="text-red-600 text-xs">{errors.confirmPassword.message}</p>
                        )}
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-[var(--heading-color)] text-white py-2 rounded-lg"
                    >
                        Reset Password
                    </button>
                </form>
            </div>
        </div>
    )
}

export default ResetPassword
