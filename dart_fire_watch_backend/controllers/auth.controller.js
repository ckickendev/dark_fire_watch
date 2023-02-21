const express = require("express");
const { Controller } = require("../core");

class AuthController extends Controller {
  _rootPath = "/auth";
  _router = express.Router();
  constructor() {
    super();
    this.initController();
  }

  async login(req, res, next) {
    console.log("req.url" + req.url);
    console.log("req.method" + req.method);
    console.log("req.payload" + req.body.email);
    console.log("req.body" + req.body.email);
  }

  async validateBeforeLogin(req, res, next) {}

  initController() {
    this._router.post(
      `${this._rootPath}/login`,
      this.validateBeforeLogin,
      this.login
    );
  }
}

module.exports = AuthController;
