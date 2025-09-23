const isProduction = process.env.NODE_ENV === "production"

export const cookieOptionsForAcessToken = {
  httpOnly: true,                     // prevents JS access to cookie
  secure: isProduction,               // true in production (HTTPS required)
  sameSite: isProduction ? "None" : "Lax", // None for cross-site cookies
  maxAge: 180 * 60 * 1000,            // 3 hours
  path: "/",
}

export const cookieOptionsForRefreshToken = {
  httpOnly: true,
  secure: isProduction,
  sameSite: isProduction ? "None" : "Lax",
  maxAge: 7 * 24 * 60 * 60 * 1000,    // 7 days
  path: "/",
}
