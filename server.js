const express = require("express");
const mysql = require("mysql");

const app = express();
const port = 4000;

// MySQL database connection configuration
const connection = mysql.createConnection({
  host: "localhost",
  user: "username",   // ✅ ควรเปลี่ยนเป็น process.env.DB_USER ในการใช้งานจริง
  password: "password", // ✅ เช่นเดียวกัน แนะนำใช้ env แทน hardcode
  database: "database_name"
});

// Connect to MySQL database
connection.connect((err) => {
  if (err) {
    console.error("❌ Error connecting to MySQL database:", err.stack);
    process.exit(1); // ✅ ออกจากโปรแกรมทันทีถ้าเชื่อมต่อ DB ไม่ได้
  }
  console.log("✅ Connected to MySQL database as id", connection.threadId);
});

// Middleware to log request method and URL
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Route handling
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/about", (req, res) => {
  res.send("About page");
});

// New simple function for lab exercise
app.get("/health", (req, res) => {
  const healthStatus = {
    status: "OK",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || "development",
    version: "1.0.0"
  };
  res.json(healthStatus);
});

// Simple calculator endpoint
app.get("/calculate/:operation/:num1/:num2", (req, res) => {
  const { operation, num1, num2 } = req.params;
  const a = parseFloat(num1);
  const b = parseFloat(num2);

  if (isNaN(a) || isNaN(b)) {
    return res.status(400).json({ error: "Both num1 and num2 must be numbers" });
  }

  let result;

  switch (operation) {
    case "add":
      result = a + b;
      break;
    case "subtract":
      result = a - b;
      break;
    case "multiply":
      result = a * b;
      break;
    case "divide":
      result = b !== 0 ? a / b : null;
      if (result === null) {
        return res.status(400).json({ error: "Cannot divide by zero" });
      }
      break;
    default:
      return res
        .status(400)
        .json({ error: "Invalid operation. Use: add, subtract, multiply, divide" });
  }

  res.json({
    operation,
    operands: [a, b],
    result
  });
});

// Start the server
app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});
