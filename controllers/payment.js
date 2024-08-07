const Razorpay = require("razorpay");
const { RAZORPAY_ID_KEY, RAZORPAY_SECRET_KEY } = process.env;
const Reserve = require("../models/reserve");
const Payment = require("../models/payment");

const instance = new Razorpay({
  key_id: RAZORPAY_ID_KEY,
  key_secret: RAZORPAY_SECRET_KEY,
});

module.exports.createOrder = async (req, res) => {
  const amount = req.body.total * 100;
  const options = {
    amount: amount,
    currency: "INR",
    receipt: req.body.email,
  };

  instance.orders.create(options, async (err, order) => {
    if (order) {
      res.status(200).send({
        success: true,
        msg: "Payment Successfull",
        order_id: order.id,
        amount: amount,
        key_id: RAZORPAY_ID_KEY,
        title: "Wanderlust247.pvt.ltd",
        description: req.body.description,
        contact: req.body.mobile,
        name: req.body.userName,
        email: req.body.email,
      });
    } else {
      res.status(400).send({ success: false, msg: "Something went wrong!" });
    }
  });
};

module.exports.validateSuccess = async (req, res) => {
  let { razorpay_payment_id, razorpay_order_id } = req.body;
  let { id } = req.params;

  const payment = await instance.payments.fetch(razorpay_payment_id);
  if (payment != null) {
    const newPayment = new Payment({
      reserveId: id,
      userId: req.user.id,
      orderId: payment.order_id,
      paymentId: payment.id,
      amount: payment.amount / 100,
      status: payment.status,
      method: payment.method,
      createdAt: new Date(Date.now()),
    });
    let payId = await newPayment.save();

    let reserve = await Reserve.findById(id);
    reserve.payment = payId.id;
    await reserve.save();
  }
};

module.exports.validateFailure = async (req, res) => {
  let { id } = req.params;
  let { payment_id } = req.body.error.metadata;

  const payment = await instance.payments.fetch(payment_id);
  if (payment != null) {
    const newPayment = new Payment({
      reserveId: id,
      userId: req.user.id,
      orderId: payment.order_id,
      paymentId: payment.id,
      amount: payment.amount / 100,
      status: payment.status,
      method: payment.method,
      createdAt: payment.created_at,
    });
    let payId = await newPayment.save();
    let reserve = await Reserve.findById(id);
    reserve.payment = payId.id;
    await reserve.save();
  }
};
