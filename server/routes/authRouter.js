const express = require("express");
const { signup, signin} = require("../controllers/authController");
const { signupSchema, signinSchema } = require("../validators/authValidator");
const validate = require("../middleware/validate");

const router= express.Router()

router.post("/signup", validate(signupSchema), signup);
router.post("/signin",validate(signinSchema), signin);

module.exports = router;
