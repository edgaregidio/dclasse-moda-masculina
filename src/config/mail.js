const nodemailer = require("nodemailer");

module.exports = {
  transporter: nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: `evolutiwmenvios@gmail.com`,
      pass: `ev0lut1@2019`,
    },
  }),
  options: {
    from: `evolutiwmenvios@gmail.com`,
    to: "delicatejeanscontato@gmail.com",
  },
};
