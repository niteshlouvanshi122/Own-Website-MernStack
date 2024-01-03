const express = require("express")
const router = express.Router();
const authController = require("../Controllers/auth-controller")
const authMiddleware = require("../Middleware/auth-middleware")

const {signUpSchema,loginSchema} = require("../Validators/auth-validators")
const validate = require("../Middleware/validate-middleware")

router.route("/").get(authController.home);
router.route("/registaion").post(validate(signUpSchema),authController.register);
router.route("/login").post(validate(loginSchema),authController.login);
router.route("/user").get(authMiddleware, authController.user);

module.exports = router
