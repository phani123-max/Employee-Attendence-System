const express = require("express");
const cors = require("cors");
const sequelize = require("./config/db");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/attendance", require("./routes/attendance"));

app.get("/", (req, res) => {
  res.send("Server is working!");
});

// Start Server Function
const startServer = async () => {
  try {
    console.log("🔄 Connecting to database...");

    await sequelize.authenticate();
    console.log("✅ Database connected successfully");

    await sequelize.sync();
    console.log("✅ Database synced");

    app.listen(5000, () => {
      console.log("🚀 Server running on port 5000");
    });

  } catch (error) {
    console.error("❌ Database connection failed:");
    console.error(error);
  }
};

// Call function
startServer();
