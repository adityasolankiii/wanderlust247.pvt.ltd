const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const {
  validateReserve,
  isLoggedIn,
  isNotOwnerForBooking,
  isReserved,
} = require("../middleware.js");
const reserveController = require("../controllers/reserve.js");

//Render Booking Form
router
  .route("/")
  .get(
    isLoggedIn,
    isNotOwnerForBooking,
    wrapAsync(reserveController.renderReserveForm)
  )
  .post(
    //Add Reserve to the DataBase
    isLoggedIn,
    isNotOwnerForBooking,
    isReserved,
    validateReserve,
    wrapAsync(reserveController.addReserve)
  );

module.exports = router;
