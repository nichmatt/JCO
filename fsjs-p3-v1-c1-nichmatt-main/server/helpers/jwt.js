const jwt = require("jsonwebtoken");
const JWT_SECRET = "secret";

function generateToken(payload) {
  // console.log(proccess.env.JWT_SECREET, "ini jwt secretnya");
  return jwt.sign(payload, process.env.JWT_SECRET);
}

function verifyToken(token) {
  return jwt.verify(token, process.env.JWT_SECRET);
}

module.exports = { generateToken, verifyToken };
