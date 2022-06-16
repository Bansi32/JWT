const jwt = require("jsonwebtoken");
class Token {
  generateToken(req, res) {
    const { username } = req.body;
    console.log(username);
    const token = jwt.sign(
      {
        username,
      },
      process.env.SECRET_KEY,
      {
        expiresIn: "1y",
      }
    );

    try {
      return token;
    } catch (e) {
      return res.status(400).json({ error: e });
    }
  }
}
module.exports = new Token();
