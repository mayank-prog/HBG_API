// const Sequelize = require("sequelize");

// const sequelize = new Sequelize(
//   "bx4rdvybeipvsecj02c9",
//   "uz0fyinu6kau3cu7",
//   "DoJi1GYRZZrIr5q4FONM",
//   {
//     dialect: "mysql",
//     host: "bx4rdvybeipvsecj02c9-mysql.services.clever-cloud.com",
//   }
// );

// module.exports = sequelize;

const { Sequelize } = require("sequelize");

require('dotenv').config();

const sequelize = new Sequelize(
process.env.RDS_DATABASE_NAME, // Replace with your RDS database name
process.env.RDS_DATABASE_USER, // Replace with your RDS database user
process.env.RDS_DATABASE_PASSWORD, // Replace with your RDS database password
  {
  dialect: "mysql",
  host: process.env.DATABASE_HOST, // Replace with your RDS host
  port: process.env.PORT_DB, // Default MySQL port
  logging: false, // Set to true if you want to see SQL logs
  }
);

module.exports = sequelize;
