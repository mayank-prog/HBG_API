const Sequelize = require("sequelize");

const sequelize = require("../util/database");

const User = sequelize.define("users_HBG", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  phone_Number: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
  },
  gender: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  father_Name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  password_PIN: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  pin_Code: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  bloodGroup: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  addressLine1: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  dateOfBirth: {
    type: Sequelize.DATE,
    allowNull: false,
  },
  isActive: {
    type: Sequelize.BOOLEAN,
    defaultValue: true, // Default value set to true
  },
});

module.exports = User;
