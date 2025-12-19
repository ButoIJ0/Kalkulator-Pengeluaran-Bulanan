exports.history = (req, res) => {
  const sql = 'SELECT * FROM expenses ORDER BY created_at DESC';

  db.all(sql, [], (err, rows) => {
    if (err) {
      console.error(err);
      return res.send('Error mengambil data');
    }

    res.render('history', {
      expenses: rows
    });
  });
};
