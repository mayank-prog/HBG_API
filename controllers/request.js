exports.getDonorByRequest = async (req, res, next) => {
  try {
    //   const stories = await Story.findAll();
    res.status(200).json({ success: true, data: "Donor" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
