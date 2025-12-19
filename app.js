const express = require('express');
const bodyParser = require('body-parser');
const Budget = require('./models/Budget');
const Expense = require('./models/Expense');

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));

// ================= HOME =================
app.get(['/', '/home'], (req, res) => {
  res.render('home');
});

// ================= PROSES =================
app.get('/proses', (req, res) => {
  res.render('proses');
});

// SET BUDGET
app.post('/set-budget', (req, res) => {
  Budget.set(req.body.amount);
  res.redirect('/proses');
});

// ADD EXPENSE
app.post('/add-expense', (req, res) => {
  const { name, amount, category } = req.body;
  Expense.add(name, amount, category);
  res.redirect('/proses');
});

// ================= RESULT + AI =================
app.get('/result', (req, res) => {
  Budget.get(budget => {
    Expense.getTotal(total => {

      let aiSuggestion = '';
      if (budget === 0) {
        aiSuggestion = 'Masukkan uang bulanan terlebih dahulu.';
      } else if (total > budget) {
        aiSuggestion = 'Pengeluaran melebihi anggaran. Kurangi pengeluaran tidak penting.';
      } else if (total > budget * 0.7) {
        aiSuggestion = 'Pengeluaran sudah di atas 70%. Sebaiknya mulai berhemat.';
      } else {
        aiSuggestion = 'Pengelolaan keuangan sudah baik. Pertahankan.';
      }

      res.render('result', {
        budget,
        total,
        aiSuggestion
      });
    });
  });
});

// ================= HISTORY =================
app.get('/history', (req, res) => {
  Budget.get(budget => {
    Expense.getAll((err, expenses) => {
      res.render('history', {
        budget,
        expenses
      });
    });
  });
});

// ================= RESET =================
app.post('/reset', (req, res) => {
  Expense.reset();
  res.redirect('/home');
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
