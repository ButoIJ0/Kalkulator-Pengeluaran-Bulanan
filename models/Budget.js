const db = require('../database/db');

class Budget {
  static set(amount) {
    db.run(`DELETE FROM budget`);
    db.run(`INSERT INTO budget (amount) VALUES (?)`, [amount]);
  }

  static get(callback) {
    db.get(`SELECT amount FROM budget LIMIT 1`, (err, row) => {
      callback(row ? row.amount : 0);
    });
  }
}

module.exports = Budget;