import passport from "passport"
import { Strategy as GoogleStrategy } from "passport-google-oauth20"
import { createUser, findUserByEmail } from "../dao/users.dao.js"
import { configDotenv} from "dotenv"
configDotenv({
    path:"./.env",
    quiet:true
})

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:8000/api/users/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails[0].value
        let user = await findUserByEmail(email)

        if (!user) {
          user = await createUser({
            fullname: {
              firstname: profile.name.givenName,
              lastname: profile.name.familyName,
            },
            email,
            googleId: profile.id,
            password: null,
            phonenumber: null,
            role: "user",
          })
        }

        done(null, user)
      } catch (err) {
        done(err, null)
      }
    }
  )
)
