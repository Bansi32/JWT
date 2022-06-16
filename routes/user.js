const express = require("express");
const router = express.Router();
const User = require("../models/user");
const { isAuth } = require("../middlewares/isAuth");
const Product = require("../models/product");
const csvtojson = require("csvtojson");

router.get("/", isAuth, async (req, res) => {
  try {
    const user = await User.find({});
    res.status(200).json({ userList: user });
  } catch (e) {
    res.status(200).json({ error: "No users available!" });
  }
});

router.get("/:id", isAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(200).json({ user: user });
  } catch (e) {
    res.status(200).json({ error: "No user found!" });
  }
});

// Testing
router.post("/:id/product", isAuth, (req, res) => {
  try {
    const { id } = req.params;
    csvtojson()
      .fromFile("./test.csv")
      .then((csvData) => {
        console.log(csvData);
        csvData.forEach((e, index) => {
          const product = new Product({
            name: e.name,
            quantity: e.quantity,
            price: e.price,
            user: id,
          });
          product.save();
          res.status(201).json({ Products: product });
        });
      })
      .catch((e) => {
        console.log(e);
      });
  } catch (error) {
    console.log(error);
  }
});

//all products by the created user
router.get("/:id/product", isAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.find({ user: id });
    res.status(201).json({ products: product });
  } catch (e) {
    res.status(400).json({ Errors: "No product found" });
  }
});

//particular product
router.get("/:id/product/:id2", isAuth, async (req, res) => {
  try {
    const { id2 } = req.params;
    const product = await Product.findById({ _id: id2 });
    res.status(201).json({ product: product });
  } catch (e) {
    res.status(400).json({ Errors: "No product found" });
  }
});

module.exports = router;
