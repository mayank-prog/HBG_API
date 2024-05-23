const Donor_Vital = require("../models/donor_vital");
const User = require("../models/users.js");

// Function to create a new user with their corresponding Vital information
exports.createVital = async (req, res, next) => {
  try {
    if (!req.user || !req.user.id) {
      return res
        .status(400)
        .json({ success: false, message: "User ID not provided" });
    }

    const user = await User.findByPk(req.user.id);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    console.log(user.id);

    // Create the vital information for the user
    const vital = await Donor_Vital.create({
      blood_age: req.body.vital_blood_age,
      platelets_age: req.body.vital_platelets_age,
      hbg_count: req.body.vital_hbg_count,
      blood_report: req.body.vital_blood_report,
      inactive_reason: req.body.vital_inactive_reason,
      extra_disease: req.body.vital_extra_desease,
      extra_disease_status: req.body.vital_vital_extra_desease_status,
      usersHBGId: user.id, // Associate the vital information with the user
    });

    // Return the created user and vital information
    return res.status(200).json({ success: true, vital: vital });
  } catch (error) {
    console.error("Error creating Donor Vitals:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

exports.getVitals = async (req, res, next) => {
  try {
    // Check if req.user is populated correctly
    if (!req.user || !req.user.id) {
      return res
        .status(400)
        .json({ success: false, message: "User ID not provided" });
    }

    // Find all history entries associated with the user by UserID
    const userVitals = await Donor_Vital.findAll({
      where: {
        usersHBGId: req.user.id,
      },
    });
    return res.status(200).json({ success: true, Vitals: userVitals });
  } catch (error) {
    console.error("Error fetching user Vitals:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

exports.updateVital = async (req, res, next) => {
  try {
    // Check if user ID is provided
    if (!req.user || !req.user.id) {
      return res
        .status(400)
        .json({ success: false, message: "User ID not provided" });
    }

    // Find the user by ID
    const user = await User.findByPk(req.user.id);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // Find the donor vital record by user ID
    const vital = await Donor_Vital.findOne({
      where: { usersHBGId: user.id },
    });

    if (!vital) {
      return res
        .status(404)
        .json({ success: false, message: "Donor vital record not found" });
    }

    // Find the donor vital record by user ID

    if (
      req.body.updatedVital &&
      req.body.updatedVital.extra_disease !== undefined
    ) {
      // Update only the specified field (e.g., extra_disease)
      await Donor_Vital.update(
        {
          extra_disease: req.body.updatedVital.extra_disease,
          admin_vital_Check: "Pending",
        },
        { where: { usersHBGId: user.id } }
      );

      // Get the updated vital information
      const Vital = await Donor_Vital.findOne({
        where: { usersHBGId: user.id },
      });
      // console.log(req.body.updatedVital);
      // Return the updated vital information
      return res.status(200).json({ success: true, vital: Vital });
    } else {
      return res
        .status(400)
        .json({ success: false, message: "Data not match with Vital Table" });
    }
  } catch (error) {
    console.error("Error updating donor vital record:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};
