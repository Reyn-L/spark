const router = require('express').Router();
const fakeData = require('../data/data.json');

router.get('/', (req, res) => {
  res.render('home');
});

router.get('/data', (req, res) => {
  res.send(JSON.stringify(fakeData))
});

module.exports = router;
