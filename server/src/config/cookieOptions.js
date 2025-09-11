export const cookieOptionsForAcessToken = {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: 120 * 60 * 1000,
    path: "/"
}

export const cookieOptionsForRefreshToken = {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
    path: "/"

}