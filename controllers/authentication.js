const User = require("../models/user");

//Signup Form
module.exports.renderSignupForm = (req, res) => {
  res.render("authentication/signup.ejs");
};

//Signup User
module.exports.signup = async (req, res) => {
  try {
    let { username, email, password } = req.body;
    const newUser = new User({ email, username });
    const registeredUser = await User.register(newUser, password);
    req.login(registeredUser, (err) => {
      if (err) {
        return next(err);
      }
      req.flash("success", "Welcome to WanderLust!");
      res.redirect("/listings");
    });
  } catch (e) {
    req.flash("error", e.message);
    res.redirect("/signup");
  }
};

//Signin Form
module.exports.renderLoginForm = (req, res) => {
  res.render("authentication/login.ejs");
};

//Signin User ---> Passport automatically doing login things. this function is for POST LOGIN THING
module.exports.login = async (req, res) => {
  req.flash("success", "Welcome to WanderLust");
  let redirectUrl = res.locals.redirectUrl || "/listings";
  res.redirect(redirectUrl);
};

//Logout
module.exports.logout = (req, res) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    req.flash("success", "You are logged out!");
    res.redirect("/listings");
  });
};
