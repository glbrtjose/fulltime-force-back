const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

const googleClientId = process.env.CLIENT_ID;
const googleClientSecret = process.env.CLIENT_SECRET;

passport.use(
  new GoogleStrategy(
    {
      clientID: googleClientId,
      clientSecret: googleClientSecret,
      callbackURL: `http://localhost:3001/auth/google/redirect`,
    },

    function (accessToken, refreshToken, profile, done) {
      // User find or create to db
      return done(null, profile);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});
