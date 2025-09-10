import { Eye, EyeOff } from "lucide-react"
import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as Yup from "yup"
import { FaUser, FaEnvelope, FaPhoneAlt, FaLock } from "react-icons/fa"
import { registerUserApi, loginUserApi } from "../api/userAPI"
import { useNavigate } from "react-router-dom"

const registerSchema = Yup.object().shape({
    firstname: Yup.string().required("First name is required"),
    lastname: Yup.string().required("Last name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().min(6, "At least 6 characters").required("Password is required"),
    phonenumber: Yup.string()
        .matches(/^[0-9]{10}$/, "Phone must be 10 digits")
        .required("Phone number is required"),
})

const loginSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required"),
})

const AuthPage = () => {
    const [isRegister, setIsRegister] = useState(true)
    const [showPassword, setShowPassword] = useState(false)
    const [conflictError, setConflictError] = useState("")
    const navigate = useNavigate()

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(isRegister ? registerSchema : loginSchema),
    })

    const onSubmit = async (data) => {
        setConflictError("")

        const payload = isRegister
            ? {
                fullname: {
                    firstname: data.firstname,
                    lastname: data.lastname,
                },
                email: data.email,
                password: data.password,
                phonenumber: data.phonenumber,
            }
            : {
                email: data.email,
                password: data.password,
            }

        try {
             isRegister
                ? await registerUserApi(payload)
                : await loginUserApi(payload)

            navigate("/")
        } catch (err) {
            const status = err.response?.status
            const message =
                err.response?.data?.message ||
                err.response?.data?.errors?.join(", ") ||
                "Something went wrong"

            if (status === 409) {
                setConflictError("User already exists with this email")
            } else {
                alert(message)
            }

            console.error("API Error:", message)
        }
    }

    return (
        <div className="w-full min-h-screen bg-[#f2f2f2] flex items-center justify-center">
            <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-2 text-[var(--heading-color)]">
                    {isRegister ? "Create Account" : "Welcome Back"}
                </h2>
                <p className="text-zinc-700 mb-6">
                    {isRegister ? "Join us and start your journey" : "Login to continue"}
                </p>

                {conflictError && (
                    <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm text-center">
                        {conflictError}
                    </div>
                )}

                <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                    {isRegister && (
                        <div className="flex gap-4">
                            <InputField
                                id="firstname"
                                label="First Name"
                                placeholder="First Name"
                                icon={<FaUser />}
                                register={register}
                                error={errors.firstname?.message}
                            />
                            <InputField
                                id="lastname"
                                label="Last Name"
                                placeholder="Last Name"
                                register={register}
                                error={errors.lastname?.message}
                            />
                        </div>
                    )}

                    <InputField
                        id="email"
                        label="Email"
                        type="email"
                        placeholder="Enter your email"
                        icon={<FaEnvelope />}
                        register={register}
                        error={errors.email?.message}
                    />

                    {/* password field */}
                    <div className="w-full">
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Password
                        </label>
                        <div className="flex items-center border border-gray-300 rounded-lg px-3 focus-within:ring-1 focus-within:ring-[var(--heading-color)]">
                            <span className="text-gray-500">
                                <FaLock />
                            </span>
                            <input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter your password"
                                {...register("password")}
                                className="w-full px-3 py-2 outline-none rounded-lg"
                            />
                            <span
                                className="text-gray-500 cursor-pointer"
                                onClick={() => setShowPassword((prev) => !prev)}
                            >
                                {showPassword ? <Eye /> : <EyeOff />}
                            </span>
                        </div>
                        {errors.password && (
                            <p className="text-red-600 text-xs mt-1">
                                {errors.password.message}
                            </p>
                        )}
                    </div>

                    {isRegister && (
                        <InputField
                            id="phonenumber"
                            label="Phone Number"
                            placeholder="Enter your number"
                            icon={<FaPhoneAlt />}
                            register={register}
                            error={errors.phonenumber?.message}
                        />
                    )}

                    <button
                        type="submit"
                        className="w-full bg-[var(--heading-color)] text-white py-2 rounded-lg hover:bg-[#00685a]"
                    >
                        {isRegister ? "Register" : "Login"}
                    </button>
                </form>

                <p className="mt-4 text-center text-gray-600 text-sm">
                    {isRegister ? "Already have an account?" : "Don’t have an account?"}{" "}
                    <button
                        type="button"
                        onClick={() => setIsRegister(!isRegister)}
                        className="text-[var(--heading-color)] hover:underline"
                    >
                        {isRegister ? "Login" : "Register"}
                    </button>
                </p>
            </div>
        </div>
    )
}

const InputField = ({ id, label, type = "text", placeholder, icon, register, error }) => {
    return (
        <div className="w-full">
            <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
                {label}
            </label>
            <div className="flex items-center border border-gray-300 rounded-lg px-3 focus-within:ring-1 focus-within:ring-[var(--heading-color)]">
                {icon && <span className="text-gray-500">{icon}</span>}
                <input
                    id={id}
                    type={type}
                    placeholder={placeholder}
                    {...register(id)}
                    className="w-full px-3 py-2 outline-none rounded-lg"
                />
            </div>
            {error && <p className="text-red-600 text-xs mt-1">{error}</p>}
        </div>
    )
}

export default AuthPage
