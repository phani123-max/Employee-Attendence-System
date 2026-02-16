const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const User = require("./User");

const Attendance = sequelize.define("Attendance", {
  date: DataTypes.DATEONLY,
  checkInTime: DataTypes.DATE,
  checkOutTime: DataTypes.DATE,
  status: DataTypes.STRING,
  totalHours: DataTypes.FLOAT
});

User.hasMany(Attendance, { foreignKey: "userId" });
Attendance.belongsTo(User, { foreignKey: "userId" });

module.exports = Attendance;
