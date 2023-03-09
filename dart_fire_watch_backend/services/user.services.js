const { Service } = require("../core");
const { User } = require("../models");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const sendgridTransport = require("nodemailer-sendgrid-transport");
const { makerandomstring } = require("../utils/function");
const { ServerException } = require("../exceptions");

const transporter = nodemailer.createTransport(
  sendgridTransport({
    auth: {
      api_key:
        "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",
    },
  })
);

class UserService extends Service {
  async getAllUser() {
    const users = await User.find({});
    return users;
  }

  async register(email, password) {
    try {
      const passwordEncrypt = await bcrypt.hash(password, 10);
      await User.create({
        username: email,
        email: email,
        password: passwordEncrypt,
      });
    } catch (e) {
      throw new ServerException("Error", e.message);
    }
  }

  async resetpassword(email) {
    const linkResetPassword =
      process.env.ROOT_BACKEND + "/auth/resetpasswordlink?token=" + makerandomstring(10);
    try {
      transporter.sendMail({
        to: email,
        from: "thesoonafu@gmail.com",
        subject: "Your link to reset your password",
        html: `<h1>Here is your link <a href="${linkResetPassword}" >Click here</a> </h1> `,
      });
    } catch (e) {
      throw new ServerException("Error", e.message);
    }
  }
}

module.exports = new UserService();
