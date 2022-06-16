require("dotenv").config();
const express = require("express");
const app = express();
const auth = require("./routes/auth");
const user = require("./routes/user");
require("./helpers/dbConnect");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", auth);
app.use("/api/user", user);

app.get("/", (req, res) => {
  res.send("Hello");
});

const PORT = 8000;

app.listen(PORT, () => {
  console.log(`LISTENING TO ${PORT}`);
});
