const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: String,
  age: Number,
  email: String,
  password: String,
  carts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "carts",
    },
  ]
});

module.exports = mongoose.model("users", userSchema);
