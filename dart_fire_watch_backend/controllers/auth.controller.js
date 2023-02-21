const express = require("express");
const bcrypt = require("bcrypt");
const { Controller } = require("../core");
const {
  NotFoundException,
  BadRequestException,
  ServerException,
} = require("../exceptions");
const { User } = require("../models");
const userServices = require("../services/user.services");

class AuthController extends Controller {
  _rootPath = "/auth";
  _router = express.Router();
  constructor() {
    super();
    this.initController();
  }

  async login(req, res, next) {
    res.json({
      status: 200,
      message: "Login Success",
    });
  }

  async register(req, res, next) {
    const { email, password } = req.body;
    try {
      await userServices.register(email, password);
      res.json({
        status: 200,
        message: "Create Success",
      });
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }

  async validateBeforeLogin(req, res, next) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email: email });
      if (!user) {
        throw new NotFoundException("User not found");
      }
      const isPasswordTrue = await bcrypt.compare(password, user.password);
      if (!isPasswordTrue) {
        throw new BadRequestException(
          "Password not matching!",
          "Password not matching!"
        );
      }
      req.user = user;
      next();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async validateBeforeRegister(req, res, next) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email: email });
      if (user) {
        throw new NotFoundException("User exist!");
      }

      let errorMessage = "";

      if (!email || !password) {
        if (!email) {
          errorMessage = "Email cannot empty";
        }
        if (!password) {
          errorMessage = "Password cannot empty";
        }
      }

      if (email.length < 6) {
        errorMessage = "Email size must larger than 6";
      }

      if (password.length < 6) {
        errorMessage = "Password size must larger than 6";
      }

      if (errorMessage) {
        return next(new NotFoundException("Failure", errorMessage));
      }
      next();
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  initController() {
    this._router.post(
      `${this._rootPath}/login`,
      this.validateBeforeLogin,
      this.login
    );
    this._router.post(
      `${this._rootPath}/register`,
      this.validateBeforeRegister,
      this.register
    );
  }
}

module.exports = AuthController;
