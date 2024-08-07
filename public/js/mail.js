const nodemailer = require("nodemailer");
module.exports.sendReserveMail = (to, username, Checkin, Checkout, total) => {
  let mailer = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "wanderlust247.pvt.ltd@gmail.com",
      pass: "efby zljl hdsa szyt",
    },
  });
  let maildetail = {
    from: "wanderlust247.pvt.ltd@gmail.com",
    to: to,
    subject: "Confirmation of Booking",
    text: `Dear ${username},

We are delighted to confirm your booking with us. Below are the details of your reservation:

Guest Name: ${username}

Check-in Date: ${Checkin.toString().split(" ").slice(1, 4).join("-")}

Check-out Date: ${Checkout.toString().split(" ").slice(1, 4).join("-")}

total amount to pay: ₹​${total}

Please review the details above and let us know if there are any changes or additional requirements. We look forward to welcoming you on ${Checkin.toString()
      .split(" ")
      .slice(1, 4)
      .join("-")}.
Should you have any questions or need further assistance, feel free to contact us at +91 7096334652/9099756390 or reply directly to this email.

Thank you for choosing Wanderlust247.pvt.ltd. We hope you have a pleasant stay with us!

Best regards,

Aditya Solanki | Keval Chauhan
CEO & Co-Founder
Wanderlust247.pvt.ltd
wanderlust247.pvt.ltd@gmail.com`,
  };
  mailer.sendMail(maildetail, function (error, result) {
    if (error) throw error;
    console.log("Reserve email send");
  });
};

//When Booking Are cancle then this mail is send

module.exports.sendCancellationMail = (to, username) => {
  let mailer = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "wanderlust247.pvt.ltd@gmail.com",
      pass: "efby zljl hdsa szyt",
    },
  });
  let maildetail = {
    from: "wanderlust247.pvt.ltd@gmail.com",
    to: to,
    subject: "Confirmation of Cancellation: Booking",
    text: `Dear ${username},

This email confirms the cancellation of your booking with Wanderlust. 
Below are the details of your cancelled reservation:

Guest Name: ${username}

Your cancellation has been processed as requested. If you have any questions or need further assistance,
please feel free to contact us at +91 7096334652/9099756390.

Thank you for choosing Wanderlust247.pvt.ltd We hope to have the opportunity to welcome you in the future.


Best regards,

Aditya Solanki | Keval Chauhan
CEO & Co-Founder
Wanderlust247.pvt.ltd
wanderlust247.pvt.ltd@gmail.com`,
  };
  mailer.sendMail(maildetail, function (error, result) {
    if (error) throw error;
    console.log("Cancellation email send");
  });
};
