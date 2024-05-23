const Sequelize = require("sequelize");
const sequelize = require("../util/database");

// Define the User model
const User = require("./users"); // Assuming your User model is defined in user.js

const Donor_vital = sequelize.define("Donor_vital", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  blood_age: {
    type: Sequelize.INTEGER,
    defaultValue: 90, // Default blood age value
  },
  platelets_age: {
    type: Sequelize.INTEGER,
    defaultValue: 60, // Default platelets age value
  },
  hbg_count: {
    type: Sequelize.FLOAT,
    defaultValue: 0.0, // Default HbG count value
  },
  blood_report: {
    type: Sequelize.STRING, // Default blood report URL
  },
  inactive_reason: {
    type: Sequelize.STRING,
    allowNull: true, // Nullable
  },
  extra_disease: {
    type: Sequelize.STRING,
    allowNull: true, // Nullable
  },
  extra_disease_status: {
    type: Sequelize.BOOLEAN,
    defaultValue: false, // Default extra disease status
  },
  admin_vital_Check: {
    type: Sequelize.STRING,
    defaultValue: "Pending",
  },
});

module.exports = Donor_vital;
