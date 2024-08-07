const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Reserve = require("./reserve");
const User = require("./user");
const { required } = require("joi");

const paymentSchema = new mongoose.Schema({
  reserveId: {
    type: Schema.Types.ObjectId,
    ref: "Reserve",
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  orderId: {
    type: String,
    required: true,
  },
  paymentId: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ["created", "authorized", "captured", "refunded", "failed"],
    required: true,
  },
  method: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
  },
});

module.exports = mongoose.model("Payment", paymentSchema);
