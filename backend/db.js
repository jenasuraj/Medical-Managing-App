// db.js
const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'jenasuraj', // your MySQL username
  password: 'Surajaezakmi2002@', // your MySQL password
  database: 'hospital_management', // your MySQL database name
  timezone: 'Z',
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
  } else {
    console.log('Connected to MySQL');
  }
});

module.exports = db;
