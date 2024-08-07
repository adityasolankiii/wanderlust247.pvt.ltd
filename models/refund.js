const { string, required } = require("joi");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Payment = mongoose.Schema;

const refundSchema = new Schema({
  refundId: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "processed", "failed"],
  },
  paymentId: {
    type: Schema.Types.ObjectId,
    ref: "Payment",
  },
  created_at: {
    type: Date,
  },
});

module.exports = mongoose.model("Refund", refundSchema);
