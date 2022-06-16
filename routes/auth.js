const express = require("express");
const { check, validationResult } = require("express-validator");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Token = require("../helpers/token");

// sign up route
router.post(
  "/signup",
  [
    check("username", "Please provide a valid username")
      .isString()
      .isLowercase()
      .not()
      .isNumeric()
      .not()
      .isAlpha(),
    check(
      "password",
      "Please provide a password that is greater than 7 characters"
    )
      .isString()
      .not()
      .isLowercase()
      .not()
      .isUppercase()
      .not()
      .isNumeric()
      .not()
      .isAlpha(),
  ],
  async (req, res) => {
    try {
      const { fname, lname, username, password } = req.body;

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
      }

      if ((!fname, !lname, !username, !password)) {
        res.status(404).json({ error: "Please fill all the fields" });
      }
      const userExist = await User.findOne({ username });
      if (userExist) {
        res.status(400).json({ error: "User already exist" });
      }

      const user = await User.create({ fname, lname, username, password });
      user.save();
      const token = Token.generateToken(req, res);

      res.status(201).json({ Message: "New User created", token: token });
    } catch (e) {
      res.status(400).json({ error: "Something went wrong!" });
    }
  }
);

router.get("/signup", (req, res) => {
  res.send("Auth part");
});

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username: username });
    if (!user || !password) {
      res.status(400).json({ error: "Invalid credentials!" });
    }
    const isMatch = bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(400).json({ error: "Invalid credentials!" });
    }
    const token = Token.generateToken(req, res);
    res.status(201).json({ Message: "User LoggedIn", token: token });
  } catch (e) {
    console.log(e);
    res.status(400).json({ error: e });
  }
});

module.exports = router;
