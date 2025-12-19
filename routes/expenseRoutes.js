const router = require('express').Router();
const c = require('../controllers/expenseController');

router.get('/', c.home);
router.get('/proses', c.prosesPage);
router.post('/proses', c.proses);
router.get('/result', c.result);
router.get('/history', c.history);

module.exports = router;
