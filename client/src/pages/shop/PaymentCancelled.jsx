import React from "react";
import { useNavigate } from "react-router-dom";
import { XCircle } from "lucide-react";

const PaymentCancelled = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-4">
      <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 max-w-md w-full text-center transform transition-all duration-300 animate-fadeIn">
        <XCircle className="mx-auto h-12 w-12 text-red-500 mb-4" />
        <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">
          Payment Cancelled
        </h1>
        <p className="text-sm sm:text-base text-gray-600 mb-6">
          Your payment was cancelled. Please try again or return to your cart to continue shopping.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => navigate("/cart")}
            className="px-4 py-2 bg-[var(--heading-color)] hover:bg-green-700 text-white rounded-lg text-sm sm:text-base font-medium transition-all duration-200"
          >
            Return to Cart
          </button>
          <button
            onClick={() => navigate("/cart")} 
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg text-sm sm:text-base font-medium transition-all duration-200"
          >
            Try Again
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentCancelled;