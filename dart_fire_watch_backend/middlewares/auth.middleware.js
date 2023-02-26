const jwt = require("jsonwebtoken");
const { ConsoleLogger } = require("../core");
require("dotenv").config();
const { UnauthorizedException, NotFoundException } = require("../exceptions");
const { User } = require("../models");

async function AuthMiddleware(req, res, next) {
  try {
    const tokenClient = req.headers["authorization"].split(" ")[1];
    if (!tokenClient) {
      return next(new UnauthorizedException());
    }
    const validToken = jwt.verify(tokenClient, "SECRET_KEY", {
      algorithms: ["HS256"],
    });
    console.log(validToken);
    const checkingUser = await User.find({ email: validToken.email });
    if (!checkingUser) {
      return next(new NotFoundException("User not found!"));
    }
    req.userInfo = validToken;
    next();
  } catch (error) {
    next(new UnauthorizedException());
  }
}

module.exports = AuthMiddleware;
