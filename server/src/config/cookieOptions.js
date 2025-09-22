export const cookieOptionsForAcessToken = {
    httpOnly: true,
    secure: true,
    sameSite: "strict", // Change from "none" to "strict"
    maxAge: 180 * 60 * 1000,
    path: "/",
    // Remove domain completely - let browser set it automatically
}

export const cookieOptionsForRefreshToken = {
    httpOnly: true,
    secure: true,
    sameSite: "strict", // Change from "none" to "strict"  
    maxAge: 7 * 24 * 60 * 60 * 1000,
    path: "/",
    // Remove domain completely
}