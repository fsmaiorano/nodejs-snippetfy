const express = require('express');

const routes = express.Router();
const authController = require('./controllers/authController');

// middleware
routes.use((req, res, next) => {
  // res.locals - object with variables for views

  res.locals.flashSuccess = req.flash('success');
  res.locals.flashError = req.flash('error');
  next();
});

routes.get('/', authController.signin);
routes.get('/signup', authController.signup);
routes.post('/register', authController.register);

module.exports = routes;
