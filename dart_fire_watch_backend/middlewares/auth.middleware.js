const { UnauthorizedException } = require("../exceptions");

async function AuthMiddleware(req, res, next) {
  try {
    const tokenClient = req.headers['authorization'].split(" ")[1];
    console.log(tokenClient);
  } catch (error) {
    next(new UnauthorizedException());
  }
}

module.exports = AuthMiddleware;
