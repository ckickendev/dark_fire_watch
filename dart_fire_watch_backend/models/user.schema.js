const mongoose = require("mongoose");
const uuid = require("node-uuid");

const { Schema } = mongoose;
const userSchema = new Schema(
    {
      _id: {
        type: String,
        default: () => uuid.v4(),
      },
      username: String,
      password: String,
      email: String,
    },
    {
      timestamps: true,
    }
  );
  
  module.exports = mongoose.model("users", userSchema);
  