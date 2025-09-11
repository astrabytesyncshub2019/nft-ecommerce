import { Handbag } from "lucide-react"
import { useNavigate } from "react-router"
import { addToCart } from '../../api/cartAPI'
import { useSelector } from "react-redux"

const AddToCartButton = ({ productId }) => {
    const { isAuthenticated } = useSelector((state) => state.auth)
    const navigate = useNavigate()
    const handleAddToCart = async (productId) => {
        if (!isAuthenticated) {
            navigate("/user")
            return
        }

        try {
            await addToCart(productId)
            navigate("/cart")
        } catch (error) {
            console.error("Error adding products to cart:", error.message)
        }
    }

    return (
        <>
            <button className="bg-white p-3 rounded-full shadow-md text-black hover:bg-[--heading-color] hover:text-white transition" onClick={() => handleAddToCart(productId)}>
                <Handbag size={24} />
            </button>

        </>
    )
}

export default AddToCartButton