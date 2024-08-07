const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const paymentController = require("../controllers/payment.js");

router.post("/createOrder", wrapAsync(paymentController.createOrder));
router.post("/validateSuccess", wrapAsync(paymentController.validateSuccess));
router.post("/validateFailure", wrapAsync(paymentController.validateFailure));
module.exports = router;
