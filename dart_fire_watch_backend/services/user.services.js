const { Service } = require("../core");
const { User } = require("../models");

class UserService extends Service {
  async getAllUser() {
    const users = await User.find({});
    return users;
  }
}

module.exports = new UserService();
