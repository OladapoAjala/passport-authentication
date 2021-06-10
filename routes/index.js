const express = require('express');

const router = express.Router();

/********* Handle routes for root APIs **********/

router.route('/').get((req, res) => {
  res.render('welcome');
});

module.exports = router;
