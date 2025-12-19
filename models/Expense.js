const db = require('../database/db');

class Expense {
  static add(name, amount, category) {
    db.run(`INSERT INTO expenses (name, amount, category) VALUES (?, ?, ?)`
    , [name, amount, category]);
  }

  static getAll(callback) {
    db.all(`SELECT * FROM expenses`, callback);
  }

  static getTotal(callback) {
    db.get(`SELECT SUM(amount) AS total FROM expenses`, (err, row) => {
      callback(row.total || 0);
    });
  }

  static reset() {
    db.run(`DELETE FROM expenses`);
    db.run(`DELETE FROM budget`);
  }
}

module.exports = Expense;