const { verifyToken } = require('../utils/jwtUtils');
const authenticate = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({
      status: "fail",
      message: "Access denied. No token provided.",
    });
  }

  const decoded = verifyToken(token);

  if (!decoded) {
    return res.status(400).json({
      status: "fail",
      message: "Invalid token.",
    });
  }

  req.user = decoded;
  next();
};

module.exports = authenticate;