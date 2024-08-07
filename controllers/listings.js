const Listing = require("../models/listing");
const Reserve = require("../models/reserve");
const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");
const mapToken = process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapToken });

//Index
module.exports.index = async (req, res) => {
  let allListings = await Listing.find({});
  res.render("listings/index.ejs", { allListings });
};

//NewForm for Create Listing
module.exports.renderNewForm = (req, res) => {
  res.render("listings/new.ejs");
};

//Create Listing
module.exports.createListing = async (req, res, next) => {
  try {
    let response = await geocodingClient
      .forwardGeocode({
        query: req.body.listing.location,
        limit: 1,
      })
      .send();

    let url = req.file.path;
    let filename = req.file.filename;

    const newlisting = new Listing(req.body.listing);
    newlisting.owner = req.user._id;
    newlisting.image = { url, filename };
    newlisting.geometry = response.body.features[0].geometry;

    await newlisting.save();
    req.flash("success", "Your property has been listed!");
    res.redirect("/listings");
  } catch (error) {
    console.log(error);
  }
};

//Show Listing
module.exports.showListing = async (req, res) => {
  let { id } = req.params;

  await Reserve.find({ listing: id });

  const listing = await Listing.findById(id)
    .populate({ path: "reviews", populate: { path: "author" } })
    .populate("owner");
  if (!listing) {
    req.flash("error", "Property you requested for does not exists!");
    res.redirect("/listings");
  }
  if (req.user && req.user._id.equals(listing.owner._id)) {
    res.render("listings/show.ejs", { listing });
  } else {
    res.render("users/userShow.ejs", { listing });
  }
};

//Render Edit form to edit Listing
module.exports.renderEditForm = async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  if (!listing) {
    req.flash("error", "Property you requested for does not exists!");
    res.redirect("/listings");
  }

  let originalImageUrl = listing.image.url;
  originalImageUrl = originalImageUrl.replace(
    "/upload",
    "/upload/c_fill,h_75,w_150"
  );
  res.render("listings/edit.ejs", { listing, originalImageUrl });
};

//Update Listing
module.exports.updateListing = async (req, res) => {
  try {
    let response = await geocodingClient
      .forwardGeocode({
        query: req.body.listing.location,
        limit: 1,
      })
      .send();

    let { id } = req.params;
    let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    listing.geometry = response.body.features[0].geometry;
    await listing.save();

    if (typeof req.file != "undefined") {
      let url = req.file.path;
      let filename = req.file.filename;
      listing.image = { url, filename };
      await listing.save();
    }

    req.flash("success", "Listing Updated!");
    res.redirect(`/listings/${id}`);
  } catch (error) {
    console.log(error);
  }
};

//Delete Listing
module.exports.destroyListing = async (req, res) => {
  let { id } = req.params;
  await Listing.findByIdAndDelete(id);
  req.flash("success", "Listing Deleted!");
  res.redirect("/listings");
};

//free
module.exports.freeListing = async (req, res) => {
  let { id } = req.params;
  await Listing.findByIdAndUpdate(id, {
    $set: { isReserved: req.body.isReserved },
  });
};

//get lisiting status
module.exports.listingStatus = async (req, res) => {
  let { id } = req.params;
  let listing = await Listing.findById(id);
  res.send(listing.isReserved);
};
