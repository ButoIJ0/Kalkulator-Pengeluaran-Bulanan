const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database/finance.db');

// Tabel budget
db.run(`CREATE TABLE IF NOT EXISTS budget (
  id INTEGER PRIMARY KEY,
  amount INTEGER
)`);

// Tabel pengeluaran
db.run(`CREATE TABLE IF NOT EXISTS expenses (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT,
  amount INTEGER,
  category TEXT
)`);

module.exports = db;