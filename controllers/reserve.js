const Listing = require("../models/listing.js");
const Reserve = require("../models/reserve.js");

const { sendReserveMail } = require("../public/js/mail.js");

module.exports.renderReserveForm = async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  if (!listing) {
    req.flash("error", "Listing you requested for dose not exist");
    res.redirect("/listings");
  }
  res.render("reserve/reserve.ejs", { listing });
};

module.exports.addReserve = async (req, res) => {
  let listing = await Listing.findById(req.params.id);

  let reserve = new Reserve(req.body.reserve);

  let email = req.user.email;
  let username = req.user.username;

  reserve.reserveby = req.user._id;
  reserve.listing = listing._id;
  let reserveDetail = await reserve.save();
  listing.isReserved = true;
  await listing.save();
  if (reserveDetail) {
    sendReserveMail(
      email,
      username,
      reserve.checkin,
      reserve.checkout,
      reserve.total
    );
  }
  req.flash("success", "Booking Confirm!");
  res.redirect(`/user/${req.user.id}/reserves`);
};
