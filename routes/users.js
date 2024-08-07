const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const { isLoggedIn } = require("../middleware.js");

const userController = require("../controllers/users.js");

//Show all Reservation done by user
router.get("/reserves", isLoggedIn, wrapAsync(userController.allReserve));

router.get(
  "/listings",
  isLoggedIn,
  wrapAsync(userController.renderUserListings)
);

//Cancel Reservation
router.post(
  "/reserves/:id/cancel",
  isLoggedIn,
  wrapAsync(userController.cancel)
);
module.exports = router;
