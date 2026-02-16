const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("attendance_db", "root", "phaniraj@143", {
  host: "localhost",
  dialect: "mysql",
  logging: false,
});

module.exports = sequelize;
