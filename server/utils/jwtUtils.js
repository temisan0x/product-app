require("dotenv").config();
const jwt = require('jsonwebtoken');

const secretKey = process.env.SECRET_KEY;

const generateToken = (user) => {
  const payload = {
    id: user.id,
    email: user.email,
    userType: user.userType,
  };

  const token = jwt.sign(payload, secretKey, {
    expiresIn: '1h',
  });

  return token;
};

const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, secretKey);
    return decoded;
  } catch (error) {
    return null;
  }
};

module.exports = { generateToken, verifyToken };