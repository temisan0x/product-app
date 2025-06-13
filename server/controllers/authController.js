const User = require("../db/models/user");
const { generateToken } = require('../utils/jwtUtils');
const AppError = require('../utils/error');

async function signup(req, res, next) {

   try {
      const { firstName, lastName, email, password, confirmPassword } = req.body;

       const emailExist = await User.findOne({ where: { email } });

      if (emailExist) {
         return res.status(401).json({
            status: "fail",
            message: "email already in use",
         });
      }

      if (!confirmPassword) {
         return res.status(401).json({
            status: "fail",
            message: "Password doesn't match"
         });
      }

      const newUser = await User.create({
         userType: "CUSTOMER",
         firstName,
         lastName,
         email,
         password,
         confirmPassword,
      });

      return res.status(201).json({
         status: "success",
         message: "user successfully created",
         data: {
            id: newUser.id,
            firstName: newUser.firstName,
            lastName: newUser.lastName,
            email: newUser.email,
            userType: newUser.userType,
         },
      });
   } catch (error) {
      next(new AppError('internal server error', 400))

      if (error.name === "SequelizeValidationError") {
         return res.status(400).json({
            status: "fail",
            message: error.errors[0].message,
         });
      }

      return res.status(400).json({
         status: "fail",
         message: "Internal server error",
      });
   }
}

async function signin(req, res, next) {
   try {
      const { email, password } = req.body;
      const user = await User.findOne({ where: { email } });

      if (!user) {
         return res.status(401).json({
            status: "fail",
            message: "Invalid email or password",
         });
      }

      const isMatch = user.validPassword(password);

      if (!isMatch) {
         return res.status(401).json({
            status: "fail",
            message: "Invalid email or password",
         });
      };

      const token = generateToken(user);

      return res.status(201).json({
         status: "success",
         message: "Login successful",
         data: {
            token,
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            userType: user.userType,
         },
      });
   } catch (error) {
       next(new AppError('internal server error', 400))
      return res.status(400).json({
         status: "fail",
         message: "Internal server error",
      });
   }
}

module.exports = { signup, signin};
