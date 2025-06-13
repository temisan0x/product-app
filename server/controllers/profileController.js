const AppError = require("../utils/error");
const User = require("../db/models/user");

async function getProfile(req, res, next) {
  try {
    const user = await User.findByPk(req.user.id);
    if (!user) {
      return res.status(404).json({
        status: "fail",
        message: "User not found",
      });
    }

    return res.status(200).json({
      status: "success",
      data: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        userType: user.userType,
      },
    });
  } catch (error) {
    next(new AppError("internal server error", 400));

    return res.status(400).json({
      status: "fail",
      message: "Internal server error",
    });
  }
}

module.exports = { getProfile };
