const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  fname: {
    type: String,
    required: true,
    minlength: 3,
  },
  lname: {
    type: String,
    required: true,
    minlength: 3,
  },
  username: {
    type: String,
    unique: true,
    required: true,
    minlength: 3,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
});

//middleware hash password
userSchema.pre("save", async function (next) {
  //const passwordHash = await bcrypt.hash(password, 12);
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

const User = new mongoose.model("User", userSchema);
module.exports = User;
