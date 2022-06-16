const express = require("express");
const router = express.Router();
const User = require("../models/user");
const { isAuth } = require("../middlewares/isAuth");
// const multer = require("multer");
// const path = require("path");
// const Product = require("../models/product");
// const csv = require("csvtojson");

// router.use(express.static(path.resolve(__dirname, "upload")));

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
let data;
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

let uploads = multer({ storage: storage });

router.post("/:id/product", isAuth, uploads.single("csv"), (req, res) => {
  const { id } = req.params;
  csv()
    .fromFile(req.file.path)
    .then((jsonObj) => {
      console.log(jsonObj);
      for (let i = 0; i < jsonObj; i++) {
        data = parseInt(jsonObj[i].quantity);
        jsonObj[i].quantity = data;
        data = parseFloat(jsonObj[i].price);
        jsonObj[i].price = data;
      }
      Product.insertMany({ jsonObj, user: id });
    });
});

router.get("/:id/product", isAuth, async (req, res) => {
  try {
    const product = await Product.find({});
    res.status(201).json({ products: product });
  } catch (e) {
    res.status(400).json({ Errors: "No product found" });
  }
});

router.get("/:id/product/:id2", isAuth, async (req, res) => {
  try {
    const { id2 } = req.params;
    const product = await Product.findById({ _id: id2 });
    res.status(201).json({ product: product });
  } catch (e) {
    res.status(400).json({ Errors: "No product found" });
  }
});

//all products by the created user
router.get("/:id/product", isAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findMany({ user: id });
    res.status(201).json({ products: product });
  } catch (e) {
    res.status(400).json({ Errors: "No product found" });
  }
});

module.exports = router;
