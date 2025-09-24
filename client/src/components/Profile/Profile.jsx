import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { LogOut, Edit2, Save, X, User, Mail, Phone, Lock } from "lucide-react"
import { logoutUserApi, upadteUserProfileApi } from "../../api/userAPI"
import { logout as logoutAction, login } from "../../store/authslice"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as Yup from "yup"

const Profile = ({ setShowProfile }) => {
  const { user } = useSelector((state) => state.auth)
  // console.log("redux state", user)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [editMode, setEditMode] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const validationSchema = Yup.object({
    firstname: Yup.string().required("First name is required"),
    lastname: Yup.string().required("Last name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    phonenumber: Yup.string()
      .matches(/^[0-9]{10}$/, "Phone must be 10 digits")
      .required("Phone number is required"),
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      firstname: user?.fullname?.firstname || "",
      lastname: user?.fullname?.lastname || "",
      email: user?.email || "",
      phonenumber: user?.phonenumber || "",
    },
  })

  const handleUpdate = async (data) => {
    try {
      setIsLoading(true)
      const res = await upadteUserProfileApi(data)
      // console.log("updated user", res)

      // Update Redux
      dispatch(login(res))

      // Reset form with updated values
      reset({
        firstname: user?.fullname?.firstname || "",
        lastname: user?.fullname?.lastname || "",
        email: user?.email || "",
        phonenumber: user?.phonenumber || "",
      })



      toast.success("Profile updated successfully!")
      setEditMode(false)
    } catch (error) {
      console.log(error)
      toast.error(error?.response?.data?.message || "Update failed")
    } finally {
      setIsLoading(false)
    }
  }


  const handleLogout = async () => {
    try {
      setIsLoading(true)
      await logoutUserApi()
      dispatch(logoutAction())
      toast.success("Logged out successfully!")
      navigate("/auth")
      setShowProfile(false)
    } catch (error) {
      dispatch(logoutAction())
      navigate("/auth")
      setShowProfile(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 h-screen">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative ">
        {/* Close */}
        <button
          onClick={() => setShowProfile(false)}
          className="absolute top-3 right-3 text-gray-500 hover:text-red-500"
        >
          <X size={18} />
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <img
            src={`https://api.dicebear.com/7.x/initials/svg?seed=${user?.fullname?.firstname || "User"
              }`}
            alt="Profile"
            className="w-20 h-20 rounded-full mx-auto mb-3"
          />
          <h2 className="text-xl font-bold">
            {editMode ? "Edit Profile" : "My Profile"}
          </h2>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(handleUpdate)} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <InputField
              id="firstname"
              label="First Name"
              icon={<User size={14} />}
              editMode={editMode}
              register={register}
              error={errors.firstname}
              displayValue={user?.fullname?.firstname}
            />
            <InputField
              id="lastname"
              label="Last Name"
              icon={<User size={14} />}
              editMode={editMode}
              register={register}
              error={errors.lastname}
              displayValue={user?.fullname?.lastname}
            />
          </div>

          <InputField
            id="email"
            label="Email"
            type="email"
            icon={<Mail size={14} />}
            editMode={editMode}
            register={register}
            error={errors.email}
            displayValue={user?.email}
          />

          <InputField
            id="phonenumber"
            label="Phone"
            icon={<Phone size={14} />}
            editMode={editMode}
            register={register}
            error={errors.phonenumber}
            displayValue={user?.phonenumber}
          />

          {/* Actions */}
          <div className="space-y-3 pt-2">
            {editMode ? (
              <div className="flex gap-2">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex-1 bg-green-500 text-white py-2 rounded-md flex items-center justify-center gap-2 hover:bg-green-600 disabled:opacity-50"
                >
                  {isLoading ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <Save size={16} />
                  )}
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => setEditMode(false)}
                  className="flex-1 bg-gray-100 text-gray-700 py-2 rounded-md flex items-center justify-center gap-2 hover:bg-gray-200"
                >
                  <X size={16} />
                  Cancel
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => {
                  reset({
                    firstname: user?.fullname?.firstname || "",
                    lastname: user?.fullname?.lastname || "",
                    email: user?.email || "",
                    phonenumber: user?.phonenumber || "",
                  })
                  setEditMode(true)
                }}
                className="w-full bg-[var(--heading-color)] text-white py-2 rounded-md flex items-center justify-center gap-2 hover:bg-green-800"
              >
                <Edit2 size={16} />
                Edit Profile
              </button>
            )}

            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => navigate("/change-password")}
                className="bg-gray-100 text-gray-700 py-2 rounded-md flex items-center justify-center gap-2 hover:bg-gray-200"
              >
                <Lock size={16} />
                Password
              </button>
              <button
                type="button"
                onClick={handleLogout}
                disabled={isLoading}
                className="bg-red-100 text-red-600 py-2 rounded-md flex items-center justify-center gap-2 hover:bg-red-200 disabled:opacity-50"
              >
                {isLoading ? (
                  <div className="w-4 h-4 border-2 border-red-600 border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <LogOut size={16} />
                )}
                Logout
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

const InputField = ({ id, label, type = "text", icon, editMode, register, error, displayValue }) => (
  <div className="space-y-1">
    <label htmlFor={id} className="text-sm font-medium text-gray-700">
      {label}
    </label>
    {editMode ? (
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
          {icon}
        </span>
        <input
          id={id}
          type={type}
          {...register(id)}
          className={`w-full pl-9 pr-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${error ? "border-red-300" : "border-gray-300"
            }`}
          placeholder={`Enter ${label}`}
        />
        {error && <p className="text-red-500 text-xs mt-1">{error.message}</p>}
      </div>
    ) : (
      <div className="flex items-center gap-2 p-2 border rounded-md bg-gray-50 text-gray-700">
        <span className="text-gray-400">{icon}</span>
        <span>{displayValue || <span className="italic text-gray-400">Not provided</span>}</span>
      </div>
    )}
  </div>
)

export default Profile
