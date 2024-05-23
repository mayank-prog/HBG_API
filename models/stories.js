const Sequelize = require("sequelize");
const sequelize = require("../util/database");

const Story = sequelize.define("stories_HBGs", {
  // Make sure the table name matches
  story_id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  story_date: {
    type: Sequelize.DATE,
    allowNull: false,
  },
  story_title: {
    type: Sequelize.TEXT,
    allowNull: true,
    collate: "utf8mb4_unicode_ci", // Specify collation here
  },
  story_description: {
    type: Sequelize.TEXT,
    allowNull: true,
    collate: "utf8mb4_unicode_ci", // Specify collation here
  },
  story_author: {
    type: Sequelize.TEXT,
    allowNull: true,
    collate: "utf8mb4_unicode_ci", // Specify collation here
  },
  story_image_url: {
    type: Sequelize.STRING,
    allowNull: true, // Assuming image URL is optional
  },
});

module.exports = Story;
