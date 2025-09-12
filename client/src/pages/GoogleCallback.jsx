import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

const GoogleCallback = () => {
  const navigate = useNavigate()

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const access = params.get("access")
    const refresh = params.get("refresh")

    if (access && refresh) {
      // if using localStorage
      localStorage.setItem("accessToken", access)
      localStorage.setItem("refreshToken", refresh)

      navigate("/") // redirect home after login
    }
  }, [navigate])

  return <div>Logging you in with Google...</div>
}

export default GoogleCallback
