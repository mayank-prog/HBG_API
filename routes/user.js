const path = require("path");
const express = require("express");
const UserController = require("../controllers/user.js");

const authUser = require("../middleware/auth");

const router = express.Router();

router.post("/login", UserController.user_login);

router.post("/signup", UserController.user_signup);

router.get("/info", authUser.verifyToken, UserController.user_profile);

// router.post("/password", UserController.forgot_password);

module.exports = router;
