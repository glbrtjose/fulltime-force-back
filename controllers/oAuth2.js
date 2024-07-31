var express = require("express");
var router = express.Router();

const dotenv = require("dotenv");
dotenv.config(); // Load environment variables from .env file

const { OAuth2Client } = require("google-auth-library");

/* GET users listing. */
router.post("/", async function (req, res, next) {
  res.header("Access-Control-Allow-Origin", `${process.env.FRONT_URI}`);
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Referrer-Policy", "no-referrer-when-downgrade");
  const redirectURL = `$${process.env.REDIRECT_URL}/oauth`;

  const oAuth2Client = new OAuth2Client(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    redirectURL
  );
  console.log('oAuth2Client: ', oAuth2Client);

  // Generate the url that will be used for the consent dialog.
  const authorizeUrl = oAuth2Client.generateAuthUrl({
    access_type: "offline",
    scope: "https://www.googleapis.com/auth/userinfo.profile  openid ",
    prompt: "consent",
  });
  console.log('authorizeUrl: ', authorizeUrl);

  res.json({ url: authorizeUrl });
});

module.exports = router;
