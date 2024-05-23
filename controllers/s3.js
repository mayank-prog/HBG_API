const multer = require("multer");
const path = require("path");
const AWS = require("aws-sdk");
require('dotenv').config();


// Configure AWS SDK with your credentials and region
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey:process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

// Create an S3 instance
const s3 = new AWS.S3();

// Multer configuration
const storage = multer.memoryStorage(); // Store files in memory to upload directly to S3

const upload = multer({ storage: storage }).single("pdf");

exports.url_generator = async (req, res) => {
  console.log("hi maynak we are in url url_generator");
  try {
    upload(req, res, async function (err) {
      if (err instanceof multer.MulterError) {
        // A Multer error occurred when uploading
        console.error("Multer error:", err);
        return res.status(500).json({ error: "Multer error" });
      } else if (err) {
        // An unknown error occurred when uploading
        console.error("Unknown error:", err);
        return res.status(500).json({ error: "Unknown error" });
      }

      if (!req.file) {
        console.log("no file have");
        return res.status(400).json({ error: "No file uploaded" });
      }

      // Set up parameters for S3 upload
      const params = {
        Bucket: process.env.AWS_BUCKET_NAME, // Your S3 bucket name
        s3:s3,
        // ACL:"public-read",
        Key: req.file.originalname, // Use original file name for the object key
        Body: req.file.buffer, // File data
      };

      // Upload file to S3
      const uploadResult = await s3.upload(params).promise();
      // console.log("Upload result:", uploadResult);

      const fileUrl = uploadResult.Location;
      console.log("File uploaded to:", fileUrl);
      res.status(200).json({ status: true, url : fileUrl });
    });
  } catch (error) {
    res.status(400).json({status: false,  error: "Error uploading file to S3" });
  }
};

