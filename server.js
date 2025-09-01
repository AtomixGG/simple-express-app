const express = require("express");
const mysql = require("mysql");

const app = express();
const port = 4000;

// MySQL database connection configuration
const connection = mysql.createConnection({
  host: "localhost",
  user: "username", // แทนที่ด้วยชื่อผู้ใช้ MySQL ของคุณ
  password: "password", // แทนที่ด้วยรหัสผ่าน MySQL ของคุณ
  database: "database_name" // แทนที่ด้วยชื่อฐานข้อมูลที่คุณต้องการเชื่อมต่อ
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

// ✅ ฟังก์ชันบวกเลขง่าย ๆ
function addNumbers(a, b) {
  return a + b;
}

// ตัวอย่างเรียกใช้งานฟังก์ชัน
const num1 = 5;
const num2 = 10;
const sum = addNumbers(num1, num2);
console.log(`ผลบวกของ ${num1} + ${num2} = ${sum}`);
