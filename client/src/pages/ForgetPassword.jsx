import React from "react"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as Yup from "yup"
import toast from "react-hot-toast"
import { forgotPasswordApi } from "../api/userAPI"

const schema = Yup.object({
    email: Yup.string().email("Invalid email").required("Email is required"),
})

const ForgotPassword = () => {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    })

    const onSubmit = async (data) => {
        try {
            await forgotPasswordApi(data.email)
            toast.success("Password reset link sent to your email")
        } catch (err) {
            toast.error(err?.response?.data?.message || "Failed to send reset email")
        }
    }

    return (
        <div className="w-full min-h-screen bg-[#f2f2f2] flex items-center justify-center">
            <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-2 text-[var(--heading-color)] text-center">
                    Forgot Password
                </h2>
                <p className="text-zinc-700 mb-6 text-center">
                    Enter your email and we’ll send you a reset link
                </p>

                <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                    <div className="w-full">
                        <label className="block text-sm font-medium mb-1">Email</label>
                        <input
                            type="email"
                            {...register("email")}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg outline-none"
                            placeholder="Enter your email"
                        />
                        {errors.email && <p className="text-red-600 text-xs">{errors.email.message}</p>}
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-[var(--heading-color)] text-white py-2 rounded-lg"
                    >
                        Send Reset Link
                    </button>
                </form>
            </div>
        </div>
    )
}

export default ForgotPassword
