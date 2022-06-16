const jwt = require("jsonwebtoken");

//verify token
module.exports.isAuth = async (req, res, next) => {
  try {
    const token = req.header("auth-token");
    if (!token) {
      res.status(400).json({ error: "No token found" });
    }

    let user = await jwt.verify(token, process.env.SECRET_KEY);
    req.user = user.username;
    next();
  } catch (e) {
    res.status(400).json({ error: "Something went wrong!" });
  }
};
