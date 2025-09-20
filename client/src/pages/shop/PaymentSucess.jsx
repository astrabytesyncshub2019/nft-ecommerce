// PaymentSuccess.jsx
import React, { useEffect, useState } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { CheckCircle, ShoppingBag } from 'lucide-react'
import toast from 'react-hot-toast'

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(true)
  
  const sessionId = searchParams.get('session_id')

  useEffect(() => {
    if (sessionId) {
      toast.success('Payment completed successfully!')
      setTimeout(() => {
        setIsLoading(false)
      }, 2000)
    } else {
      navigate('/cart')
    }
  }, [sessionId, navigate])

  const handleContinueShopping = () => {
    navigate('/')
  }

  const handleViewOrders = () => {
    navigate('/orders')
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--heading-color)] mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Processing your payment...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full text-center">
        <div className="mb-6">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Payment Successful!</h1>
          <p className="text-gray-600">
            Your order has been placed successfully and will be processed shortly.
          </p>
        </div>

        <div className="space-y-3">
          <button
            onClick={handleViewOrders}
            className="w-full bg-[var(--heading-color)] text-white py-3 rounded-lg hover:bg-[#017465] transition-colors duration-200 font-medium"
          >
            View My Orders
          </button>
          <button
            onClick={handleContinueShopping}
            className="w-full bg-gray-100 text-gray-700 py-3 rounded-lg hover:bg-gray-200 transition-colors duration-200 font-medium flex items-center justify-center gap-2"
          >
            <ShoppingBag className="h-4 w-4" />
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  )
}

export default PaymentSuccess