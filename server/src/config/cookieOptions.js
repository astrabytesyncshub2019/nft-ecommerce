export const cookieOptionsForAcessToken = {
    httpOnly: true,
    secure: true,
    sameSite: "strict", // Can use strict with proxy
    maxAge: 180 * 60 * 1000,
    path: "/",
    // No domain needed with proxy
}

export const cookieOptionsForRefreshToken = {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
    path: "/",
}