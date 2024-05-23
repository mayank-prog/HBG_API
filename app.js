const express = require("express");
const app = express();
const path = require("path");
const sequelize = require("./util/database");
const fs = require("fs");
const helmet = require("helmet");
const compression = require("compression");
const morgan = require("morgan");
const cron = require("node-cron");
const { Sequelize } = require("sequelize");

const User = require("./models/users");
const History = require("./models/donor_history");
const Vital = require("./models/donor_vital");

const errorController = require("./controllers/error");

const PORT = process.env.PORT || 5000;


const cors = require("cors");
app.use(cors());

const bodyParser = require("body-parser");

app.use(bodyParser.json({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

// Create a write stream for regular requests
const accessLogStream = fs.createWriteStream(
  path.join(__dirname, "access.log"),
  { flags: "a" }
);

// Create a write stream for cron job logs
const cronLogStream = fs.createWriteStream(path.join(__dirname, "cron.log"), {
  flags: "a",
});

app.use(helmet());
app.use(compression());

// Use morgan for regular requests log
app.use(morgan("combined", { stream: accessLogStream }));

// Function to log cron job messages
function logCronMessage(message) {
  console.log(message);
  cronLogStream.write(`${message}\n`);
}

// Function to decrement blood age by 1 for non-zero values
async function decrementBloodAge() {
  try {
    // Run the Sequelize query to decrement blood age by 1 for non-zero values
    await Vital.update(
      { blood_age: Sequelize.literal("blood_age - 1") },
      {
        where: {
          blood_age: {
            [Sequelize.Op.ne]: 0, // Non-zero blood age
          },
        },
      }
    );

    logCronMessage("Blood age decremented successfully");
  } catch (error) {
    console.error("Error decrementing blood age:", error);
    logCronMessage(`Error decrementing blood age: ${error.message}`);
    throw error;
  }
}

// Schedule the cron job to run every minute
cron.schedule("0 0 * * *", async () => {
  // Log the message
  logCronMessage("Cron job executed at: " + new Date().toLocaleString());

  // Check if the current time is midnight
  const now = new Date();
  if (now.getHours() === 0 && now.getMinutes() === 0) {
    // Execute the query to decrement blood age
    await decrementBloodAge();
  }
});

// for user routs
const userRouts = require("./routes/user.js");
app.use("/user", userRouts);

// for stories
const storyRouts = require("./routes/stories.js");
app.use("/stories", storyRouts);

// for request routs
const RequestRouts = require("./routes/request");
app.use("/request", RequestRouts);

const HistoryRouts = require("./routes/donor_histroy");
app.use("/history", HistoryRouts);

const S3Routs = require("./routes/s3routs");
app.use("/s3", S3Routs);

const VitalRouts = require("./routes/donor_vital");
app.use("/vital", VitalRouts);

const HBGPerformance = require("./routes/hbg_performance");
app.use("/hbg", HBGPerformance);

// Define the association between User and Vital
User.hasOne(Vital);
Vital.belongsTo(User);

User.hasMany(History);
History.belongsTo(User);

// Handling GET request
app.get("/", (req, res) => {
  res.send("A simple Node App is running on this server");
  res.end();
});

app.use(errorController.get404);

sequelize
  .sync()
  .then((result) => {
    // Database sync is successful
    app.listen(PORT, () => {
      console.log(`App is up And running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Error syncing database:", err);
  });
