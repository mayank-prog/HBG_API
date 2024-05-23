const Sequelize = require("sequelize");
const sequelize = require("../util/database");

// Define the User model
const User = require("./users"); // Assuming your User model is defined in user.js

// Define the History model for blood donation history
const Donor_History = sequelize.define("donor_history", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  bloodBankName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  date: {
    type: Sequelize.DATE,
    allowNull: false,
  },
  donationType: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  certificateURL: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  donationStatus: {
    type: Sequelize.STRING,
    defaultValue: "Pending",
  },
  // You can add more fields if needed, such as image URL
});

module.exports = Donor_History;
