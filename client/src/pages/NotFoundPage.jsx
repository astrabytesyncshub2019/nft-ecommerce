import { Link } from "react-router-dom"

const NotFound = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-blue-50 to-indigo-100 text-center px-6"> 
            <svg
                className="w-64 h-64 mb-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
            >
                <path
                    d="M12 20.25c4.694 0 8.5-3.806 8.5-8.5s-3.806-8.5-8.5-8.5-8.5 3.806-8.5 8.5 3.806 8.5 8.5 8.5z"
                    className="text-[var(--secondary-bg-color)]"
                />
                <path
                    d="M15.75 15.75L21 21"
                    className="text-[var(--heading-color)]"
                />
            </svg>

            <h1 className="text-8xl font-extrabold text-[var(--heading-color)]">404</h1>
            <p className="text-2xl font-semibold mt-4 text-gray-800">Page Not Found</p>
            <p className="text-gray-600 mt-2 max-w-md">
                Sorry, the page you are looking for might have been removed, renamed, or is temporarily unavailable.
            </p>
            <Link
                to="/"
                className="mt-6 px-6 py-3 bg-[var(--heading-color)] text-white rounded-xl shadow-lg hover:bg-green-800 transition-transform transform hover:scale-105"
            >
                Back to Home
            </Link>
        </div>
    )
}

export default NotFound
