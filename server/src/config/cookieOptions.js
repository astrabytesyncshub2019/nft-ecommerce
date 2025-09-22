export const cookieOptionsForAcessToken = {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: 180 * 60 * 1000,
    path: "/"
}

export const cookieOptionsForRefreshToken = {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: 7 * 24 * 60 * 60 * 1000,
    path: "/"

}