const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const { savedRedirectUrl, isLoggedIn } = require("../middleware.js");

const authController = require("../controllers/authentication.js");

router
  .route("/signup")
  .get(authController.renderSignupForm) //Render Signup Form
  .post(wrapAsync(authController.signup)); //Signup

//login user
router
  .route("/login")
  .get(authController.renderLoginForm) //Render Signin Form
  .post(
    savedRedirectUrl,
    passport.authenticate("local", {
      failureRedirect: "/login",
      failureFlash: true,
    }),
    authController.login
  ); //Signin

//logout user
router.get("/logout", authController.logout);
module.exports = router;
