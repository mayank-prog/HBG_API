const Donor_history = require("../models/donor_history");
const User = require("../models/users.js");

exports.createHistory = async (req, res, next) => {
  try {
    // Check if req.user is populated correctly
    if (!req.user || !req.user.id) {
      return res
        .status(400)
        .json({ success: false, message: "User ID not provided" });
    }
    console.log(" req.user.id add history data - >", req.user.id);
    // Find the user by ID
    const user = await User.findByPk(req.user.id);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    } else {
      // Create the donation history entry
      const history = await Donor_history.create({
        bloodBankName: req.body.bloodBankName,
        date: req.body.date,
        donationType: req.body.donationType,
        certificateURL: req.body.certificateURL,
        usersHBGId: user.id,
      });
      console.log(user.id);
      return res.status(200).json({ success: true, history: history });
    }
  } catch (error) {
    console.error("Error creating donation history:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

exports.getAllHistoryByUserId = async (req, res, next) => {
  try {
    // Check if req.user is populated correctly
    if (!req.user || !req.user.id) {
      return res
        .status(400)
        .json({ success: false, message: "User ID not provided" });
    }
    console.log(" req.user.id add history data - >", req.user.id);
    // Find all history entries associated with the user by UserID
    const userHistory = await Donor_history.findAll({
      where: {
        usersHBGId: req.user.id,
      },
    });
    return res.status(200).json({ success: true, history: userHistory });
  } catch (error) {
    console.error("Error fetching donation history:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};
