const Donor_history = require("../models/donor_history");
const User = require("../models/users.js");
const BannerImage = require("../models/BannerImage");

exports.HBG_Performance = async (req, res, next) => {
  try {
    // Find all verified donations
    const verifiedDonations = await Donor_history.findAll({
      where: {
        donationStatus: "Done",
      },
    });

    // Count occurrences of donation types
    let bloodCount = 0;
    let PlasamaCount = 0;

    verifiedDonations.forEach((donation) => {
      if (donation.donationType === "Blood") {
        bloodCount++;
      } else if (donation.donationType === "Platelets") {
        PlasamaCount++;
      }
    });

    // Send response
    return res.status(200).json({
      success: true,
      bloodCount: bloodCount,
      PlasamaCount: PlasamaCount,
    });
  } catch (error) {
    console.error("Error fetching user Vitals:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};


exports.BannerImages = async (req,res,next)=>{
  try {
    // Find all Banner Images.
    const BannerData = await BannerImage.findAll();
    // Extract only the image URLs.
    const imageUrls = BannerData.map(banner => banner.imageUrl);
    return res.status(200).json({
      success: true,
      imageUrls: imageUrls,
    });
  } catch (error) {
    console.error("Error fetching user Images for Banner:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
}
