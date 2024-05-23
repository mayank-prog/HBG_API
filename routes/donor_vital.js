const path = require("path");
const express = require("express");
const VitalController = require("../controllers/donor_vital");

const authUser = require("../middleware/auth");

const router = express.Router();

router.post("/addVital", authUser.verifyToken, VitalController.createVital);

router.get("/getVitals", authUser.verifyToken, VitalController.getVitals);

router.put("/updateVitals", authUser.verifyToken, VitalController.updateVital);

// router.post("/password", UserController.forgot_password);

module.exports = router;
