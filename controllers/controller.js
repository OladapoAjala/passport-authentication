const User = require('../models/User');
const bcrypt = require('bcryptjs');

exports.registerUser = async (req, res) => {
  const { name, email, password, password2 } = req.form;
  let errors = req.form.errors;

  if (!req.form.isValid) {
    res.render('register', {
      errors,
      name,
      email,
      password,
      password2,
    });
  } else {
    // Registration data passed validation
    User.findOne({ email }).then((user) => {
      errors = {
        message: 'This email address has already been used',
      };

      if (user) {
        res.render('register', {
          errors,
          name,
          email,
          password,
          password2,
        });
      }
    });

    // Hash the password
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(password, salt, async (err, hash) => {
        if (err) throw err;

        try {
          await User.create({
            name,
            email,
            password: hash,
          });

          req.flash('success_msg', 'You are now registered and can log in!');
          res.redirect('/users/login');
        } catch (err) {
          console.log(err);
          errors = {
            message: 'User creation failed',
          };

          res.render('register', {
            errors,
            name,
            email,
            password,
            password2,
          });
        }
      });
    });
  }
};

exports.login = async (req, res, next) => {
  passport.authenticate('local', {
    succsessRedirect: '/dashboard',
    failureRedirect: '/users/login',
    failureFlash: true,
  })(req, res, next);
};
