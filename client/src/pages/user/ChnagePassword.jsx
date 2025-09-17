import { Eye, EyeOff } from "lucide-react"
import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as Yup from "yup"
import { updatePasswordApi } from "../../api/userAPI"
import toast from "react-hot-toast"
import { useNavigate, Link } from "react-router-dom"

const validationSchema = Yup.object({
  oldPassword: Yup.string().required("Old password is required"),
  newPassword: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("New password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
    .required("Confirm password is required"),
})

const ChangePassword = () => {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState({
    old: false,
    new: false,
    confirm: false,
  })

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(validationSchema),
  })

  const onSubmit = async (data) => {
    try {
      const payload = {
        currentPassword: data.oldPassword,
        newPassword: data.newPassword,
      }
      await updatePasswordApi(payload)
      toast.success("Password updated successfully")
      navigate("/")
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to update password")
    }
  }

  return (
    <div className="w-full min-h-screen bg-[#f2f2f2] flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-2 text-[var(--heading-color)] text-center">
          Change Password
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          {/* Old Password */}
          <PasswordField
            id="oldPassword"
            label="Old Password"
            register={register}
            error={errors.oldPassword?.message}
            show={showPassword.old}
            toggle={() => setShowPassword({ ...showPassword, old: !showPassword.old })}
          />

          {/* New Password */}
          <PasswordField
            id="newPassword"
            label="New Password"
            register={register}
            error={errors.newPassword?.message}
            show={showPassword.new}
            toggle={() => setShowPassword({ ...showPassword, new: !showPassword.new })}
          />

          {/* Confirm Password */}
          <PasswordField
            id="confirmPassword"
            label="Confirm New Password"
            register={register}
            error={errors.confirmPassword?.message}
            show={showPassword.confirm}
            toggle={() => setShowPassword({ ...showPassword, confirm: !showPassword.confirm })}
          />

          <button
            type="submit"
            className="w-full bg-[var(--heading-color)] hover:bg-[#006759] text-white py-2 rounded-lg"
          >
            Update Password     
          </button>
        </form>

        <p className="mt-4 text-center text-gray-600 text-sm">
          Forgot your password?{" "}
          <Link to="/forgot-password" className="text-[var(--heading-color)] hover:underline">
            Reset here
          </Link>
        </p>
      </div>
    </div>
  )
}

const PasswordField = ({ id, label, register, error, show, toggle }) => {
  return (
    <div className="w-full">
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <div className="flex items-center border border-gray-300 rounded-lg px-3 focus-within:ring-1 focus-within:ring-[var(--heading-color)]">
        <input
          id={id}
          type={show ? "text" : "password"}
          placeholder={`Enter ${label.toLowerCase()}`}
          {...register(id)}
          className="w-full px-3 py-2 outline-none rounded-lg"
        />
        <span className="text-gray-500 cursor-pointer" onClick={toggle}>
          {show ? <EyeOff /> : <Eye />}
        </span>
      </div>
      {error && <p className="text-red-600 text-xs mt-1">{error}</p>}
    </div>
  )
}

export default ChangePassword
