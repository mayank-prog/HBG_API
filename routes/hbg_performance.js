const path = require("path");
const express = require("express");
const HBG_Controller = require("../controllers/hbg_performance");

const authUser = require("../middleware/auth");

const router = express.Router();

router.get("/performance", HBG_Controller.HBG_Performance);

router.get("/images", HBG_Controller.BannerImages);

// router.get("/info", authUser.verifyToken, UserController.user_profile);

// router.post("/password", UserController.forgot_password);

module.exports = router;
