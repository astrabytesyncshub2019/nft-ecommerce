import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"
import toast from "react-hot-toast"

const ProtectedRoute = ({ children, role }) => {
    const { user, isAuthenticated, loading } = useSelector((state) => state.auth)

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-50">
                <div className="flex flex-col items-center">
                    <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                    <p className="mt-4 text-lg font-semibold text-gray-600">Loading...</p>
                </div>
            </div>
        )
    }

    if (!isAuthenticated || !user) {
        toast.error("You are not logged in")
        return <Navigate to="/auth" replace />
    }

    if (role && user.role !== role) {
        toast.error("You don’t have permission")
        return <Navigate to="/" replace />
    }

    return children
}

export default ProtectedRoute
