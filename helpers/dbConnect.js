const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/authtask")
  .then(() => {
    console.log(`DB connect successful`);
  })
  .catch((e) => {
    console.log(e);
  });
