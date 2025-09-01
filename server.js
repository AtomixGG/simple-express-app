const express = require("express");
const mysql = require("mysql");

const app = express();
const port = 4000;

// MySQL database connection configuration
const connection = mysql.createConnection({
  host: "localhost",
  user: "username",
  password: "password",
  database: "database_name"
});

// Connect to MySQL database
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL database: ' + err.stack);
    return;
  }
  console.log('Connected to MySQL database as id ' + connection.threadId);
});

// Middleware to log request method and URL
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Route handling
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/about", (req, res) => {
  res.send("About page");
});

// ฟังก์ชันบวกเลข (มี code smell เล็กน้อย: unused variable)
function addNumbers(a, b) {
  let unusedVar // Code smell: variable declared but never used
  return a + b;
}

// Bug: ฟังก์ชันนี้คืนค่าไม่ถูกต้อง
function buggyMultiply(a, b) {
  return a - b; // Bug: แทนที่จะเป็น a*b
}

// เรียกใช้งานฟังก์ชัน
const sum = addNumbers(5, 10);
console.log("Sum:", sum);

const result = buggyMultiply(5, 10);
console.log("Multiply result (BUG):", result);
