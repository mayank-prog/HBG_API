const path = require("path");
const express = require("express");
const HistoryController = require("../controllers/donor_history");

const authUser = require("../middleware/auth");

const router = express.Router();

router.post(
  "/addHistory",
  authUser.verifyToken,
  HistoryController.createHistory
);

router.get(
  "/getHistory",
  authUser.verifyToken,
  HistoryController.getAllHistoryByUserId
);

// router.post("/password", UserController.forgot_password);

module.exports = router;
