// const isProduction = process.env.NODE_ENV === "production"

export const cookieOptionsForAcessToken = {
  httpOnly: true,
  secure: true,                    // must be true in prod (HTTPS)
  sameSite: "strict",                        // "None" required for cross-site
  maxAge: 180 * 60 * 1000,                 
  path: "/",
}

export const cookieOptionsForRefreshToken = {
  httpOnly: true,
  secure: true,
  sameSite: "strict",                        // must be None
  maxAge: 7 * 24 * 60 * 60 * 1000,         // 7 days
  path: "/",
}
