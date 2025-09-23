const isProduction = process.env.NODE_ENV === "production"

export const cookieOptionsForAcessToken = {
  httpOnly: true,
  secure: isProduction,                    // must be true in prod (HTTPS)
  sameSite: "None",                        // "None" required for cross-site
  maxAge: 180 * 60 * 1000,                 // 3 hours
  path: "/",
}

export const cookieOptionsForRefreshToken = {
  httpOnly: true,
  secure: isProduction,
  sameSite: "None",                        // must be None
  maxAge: 7 * 24 * 60 * 60 * 1000,         // 7 days
  path: "/",
}
