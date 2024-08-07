const Reserve = require("../models/reserve.js");
const Listing = require("../models/listing.js");
const Payment = require("../models/payment.js");
const Refund = require("../models/refund.js");
const { sendCancellationMail } = require("../public/js/mail.js");

const Razorpay = require("razorpay");
const { RAZORPAY_ID_KEY, RAZORPAY_SECRET_KEY } = process.env;

const instance = new Razorpay({
  key_id: RAZORPAY_ID_KEY,
  key_secret: RAZORPAY_SECRET_KEY,
});

//Show all Reservation done by user
module.exports.allReserve = async (req, res) => {
  let reserves = await Reserve.find({
    reserveby: req.params.id,
  })
    .populate("listing")
    .populate("payment");
  if (reserves.length == 0) {
    req.flash("error", "No Detail Found For This User");
    return res.redirect("/listings");
  }

  res.render("users/userReserves.ejs", { reserves });
};

//User Listings
module.exports.renderUserListings = async (req, res) => {
  const allListings = await Listing.find({ owner: req.params.id });
  if (allListings.length == 0) {
    req.flash("error", "No Detail Found For This User");
    return res.redirect("/listings");
  }
  res.render("users/userlistings.ejs", { allListings });
};

//Cancel Reservation
module.exports.cancel = async (req, res) => {
  let { reserveId } = req.body;
  let reserve = await Reserve.findById(reserveId);
  let payment = await Payment.findById(reserve.payment);

  await Listing.findByIdAndUpdate(reserve.listing, {
    $set: { isReserved: false },
  });

  let cancel = await Reserve.findByIdAndUpdate(reserveId, {
    $set: { isCancelled: true },
  });

  if (cancel) {
    if (
      payment != null &&
      payment.status != "failed" &&
      reserve.checkin < new Date(Date.now())
    ) {
      let rzpRefund = await instance.payments.refund(payment.paymentId, {
        amount: payment.amount * 100,
        speed: "normal",
        notes: {
          notes_key_1: `Cancellation for ${reserve._id}`,
          notes_key_2: "Engage",
        },
      });

      const newRefund = new Refund({
        refundId: rzpRefund.id,
        amount: rzpRefund.amount / 100,
        status: rzpRefund.status,
        paymentId: payment._id,
        created_at: rzpRefund.created_at,
      });

      await newRefund.save();
      await payment.updateOne({ $set: { status: "refunded" } });
    }
    req.flash("success", "Reservation cancelled successfully!");
    return res.redirect(`/user/${req.user.id}/reserves`);
  } else {
    req.flash("error", "Something went wrong!");
    res.redirect(`/user/${req.user.id}/reserves`);
  }
};
