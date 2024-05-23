// const path = require("path");
// const express = require("express");

// const authUser = require("../middleware/auth");

const express = require("express");
const router = express.Router();
const S3_Controller = require("../controllers/s3");

//start multer
// const aws = require("aws-sdk");
// const multer = require("multer");
// const multerS3 = require("multer-s3");


// aws.config.update({
//   accessKeyId: IAM_USER_KEY,
//   secretAccessKey: IAM_USER_SECRET,
//   region: "ap-south-1", // Replace with your AWS S3 bucket region
// });

// const s3 = new aws.S3();

// const upload = multer({
//   storage: multerS3({
//     s3: s3,
//     bucket: BUCKET_NAME,
//     ACL: "public-read",
//     key: function (req, file, cb) {
//       cb(null, Date.now().toString()); // Unique key for each uploaded file
//     },
//   }),
// });

//end multer S3


router.post("/url", S3_Controller.url_generator);

module.exports = router;
