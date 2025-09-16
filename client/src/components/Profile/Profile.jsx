import React, { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { LogOut, Edit2, Save, X } from "lucide-react"
import { FaUser, FaEnvelope, FaPhoneAlt } from "react-icons/fa"
import { logoutUserApi, upadteUserProfileApi } from "../../api/userAPI"
import { logout as logoutAction, login } from "../../store/authslice"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as Yup from "yup"

const Profile = ({ setShowProfile }) => {
    const { user } = useSelector((state) => state.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [editMode, setEditMode] = useState(false)

    const validationSchema = Yup.object({
        firstname: Yup.string().required("First name is required"),
        lastname: Yup.string().required("Last name is required"),
        email: Yup.string().email("Invalid email").required("Email is required"),
        phonenumber: Yup.string()
            .matches(/^[0-9]{10}$/, "Phone must be 10 digits")
            .required("Phone number is required"),
    })

    const { register, handleSubmit, formState: { errors }, reset } = useForm({
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
            const res = await upadteUserProfileApi(data)
            dispatch(login({ user: res }))
            toast.success("Profile updated")
            setEditMode(false)
        } catch (error) {
            console.log(error.message)
            toast.error(error?.response?.data?.message || "Update failed")
        }
    }

    const handleLogout = async () => {
        try {
            await logoutUserApi()
            dispatch(logoutAction())
            toast.success("Logout successfully")
            navigate("/auth") // redirect to login after logout
            setShowProfile(false)
        } catch (error) {
            console.error("Logout error", error.message)
            dispatch(logoutAction())
            navigate("/auth")
            setShowProfile(false)
        }
    }

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className=" bg-white rounded-2xl shadow-xl p-6 relative">
                <button
                    onClick={() => setShowProfile(false)}
                    className="absolute top-3 right-3 text-gray-500 hover:text-red-500"
                >
                    <X size={20} />
                </button>

                <h2 className="text-2xl font-bold mt-4 text-[var(--heading-color)] text-center">
                    {editMode ? "Edit Profile" : "My Profile"}
                </h2>

                <div className="flex flex-col items-center mb-6">
                    <img
                        src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.fullname.firstname}`}
                        alt="Profile"
                        className="w-20 h-20 rounded-full border-2 border-gray-200 shadow-md"
                    />
                </div>

                <form key={editMode ? "edit" : "view"} onSubmit={handleSubmit(handleUpdate)} className="space-y-4">
                    <InputField
                        id="firstname"
                        label="First Name"
                        icon={<FaUser />}
                        editMode={editMode}
                        register={register}
                        error={errors.firstname}
                        displayValue={user?.fullname?.firstname}
                    />
                    <InputField
                        id="lastname"
                        label="Last Name"
                        icon={<FaUser />}
                        editMode={editMode}
                        register={register}
                        error={errors.lastname}
                        displayValue={user?.fullname?.lastname}
                    />
                    <InputField
                        id="email"
                        label="Email"
                        type="email"
                        icon={<FaEnvelope />}
                        editMode={editMode}
                        register={register}
                        error={errors.email}
                        displayValue={user?.email}
                    />
                    <InputField
                        id="phonenumber"
                        label="Phone Number"
                        icon={<FaPhoneAlt />}
                        editMode={editMode}
                        register={register}
                        error={errors.phonenumber}
                        displayValue={user?.phonenumber}
                    />

                    <div className="mt-6 flex gap-4 justify-center">
                        {editMode ? (
                            <>
                                <button
                                    type="submit"
                                    className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg"
                                >
                                    <Save size={18} /> Save
                                </button>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setEditMode(false)
                                    }}
                                    className="flex items-center gap-2 bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded-lg"
                                >
                                    <X size={18} /> Cancel
                                </button>
                            </>
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
                                className="flex items-center gap-2 bg-[var(--heading-color)] hover:bg-[#004d43] text-white px-4 py-2 rounded-lg"
                            >
                                <Edit2 size={18} /> Update Profile
                            </button>
                        )}

                        <button
                            type="button"
                            onClick={handleLogout}
                            className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
                        >
                            <LogOut size={18} /> Logout
                        </button>
                        <button
                            type="button"
                            onClick={() => navigate("/change-password")}
                            className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
                        >
                            Change Password
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

const InputField = ({ id, label, type = "text", icon, editMode, register, error, displayValue }) => {
    return (
        <div>
            <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
            {editMode ? (
                <div>
                    <div className="flex items-center border border-gray-300 rounded-lg px-3 focus-within:ring-1 focus-within:ring-[var(--heading-color)]">
                        <span className="text-gray-500">{icon}</span>
                        <input
                            id={id}
                            type={type}
                            {...register(id)}
                            className="w-full px-3 py-2 outline-none rounded-lg"
                        />
                    </div>
                    {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
                </div>
            ) : (
                <div className="flex items-center gap-2 text-gray-800">
                    <span className="text-gray-500">{icon}</span>
                    <span>{displayValue || "Not added"}</span>
                </div>
            )}
        </div>
    )
}

export default Profile
