const Sequelize = require("sequelize");
const sequelize = require("../util/database");

const BannerImage = sequelize.define("Banner_Images", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    imageUrl: {
      type: Sequelize.STRING(1000), // specifying a length of 1000 characters
      allowNull: false,
    }
  });

module.exports = BannerImage;
