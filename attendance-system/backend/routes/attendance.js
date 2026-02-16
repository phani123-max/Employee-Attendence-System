const express = require("express");
const Attendance = require("../models/Attendance");
const router = express.Router();

router.post("/checkin", async (req, res) => {
  const today = new Date().toISOString().split("T")[0];

  const record = await Attendance.create({
    userId: req.body.userId,
    date: today,
    checkInTime: new Date(),
    status: "present"
  });

  res.json(record);
});

router.get("/all", async (req, res) => {
  const records = await Attendance.findAll({ include: "User" });
  res.json(records);
});

module.exports = router;
