const express = require('express');
const datalize = require('datalize');
const field = datalize.field;
const { transformAuthInfo } = require('passport');

const User = require('../models/User');
const controller = require('../controllers/controller');

const router = express.Router();

/********* Handle routes for user APIs **********/

// Register Page
router
  .route('/register')
  .get((req, res) => {
    res.render('register');
  })
  .post(
    datalize([
      field('name').trim().required(),
      field('email').required().email(),
      field('password').required().length(5, 10),
      field('password2').required().length(5, 10),
    ]),
    controller.registerUser
  );

// Login Page
router
  .route('/login')
  .get((req, res) => {
    res.render('login');
  })
  .post(controller.login);

module.exports = router;
