const isProduction = process.env.NODE_ENV === "development"

export const cookieOptionsForAcessToken = {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "strict" : "none",
    maxAge: 180 * 60 * 1000,
    path: "/",
}

export const cookieOptionsForRefreshToken = {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "strict" : "none",
    maxAge: 7 * 24 * 60 * 60 * 1000,
    path: "/",
}
