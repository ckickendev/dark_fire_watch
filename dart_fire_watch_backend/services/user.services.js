const { Service } = require("../core");
const { User } = require("../models");
const bcrypt = require("bcrypt");
const { ServerException } = require("../exceptions");

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

  // async login(email, password) {
  //   try {
  //     const passwordEncrypt = await bcrypt.hash(password, 10);
  //     await User.create({
  //       username: email,
  //       email: email,
  //       password: passwordEncrypt,
  //     });
  //   } catch (e) {
  //     throw new ServerException("Error", e.message);
  //   }
  // }
}

module.exports = new UserService();
