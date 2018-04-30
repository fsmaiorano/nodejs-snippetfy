const express = require('express');

const routes = express.Router();
const authController = require('./controllers/authController');
const dashboardController = require('./controllers/dashboardController');
const categoryController = require('./controllers/categoryController');
const snippetController = require('./controllers/snippetController');

const authMiddleware = require('./middlewares/auth');
const guestMiddleware = require('./middlewares/guest');

// middleware
routes.use((req, res, next) => {
  // res.locals - object with variables for views

  res.locals.flashSuccess = req.flash('success');
  res.locals.flashError = req.flash('error');
  next();
});

// Auth
routes.get('/', guestMiddleware, authController.signin);
routes.get('/signup', guestMiddleware, authController.signup);
routes.get('/signout', authController.signout);

routes.post('/register', authController.register);
routes.post('/authenticate', authController.authenticate);

// Dashboard
routes.use('/app', authMiddleware);
routes.get('/app/dashboard', dashboardController.index);

// Categories
routes.post('/app/categories/create', categoryController.store);
routes.get('/app/categories/:id', categoryController.show);

// Snippets
routes.post('/app/categories/:categoryId/snippets/create', snippetController.store);
routes.get('/app/categories/:categoryId/snippets/:id', snippetController.show);

routes.use((req, res) => res.render('errors/404'));

routes.use((err, req, res, _next) => {
  res.status(err.status || 500);
  return res.render('errors/index', {
    message: err.message,
    error: process.env.NODE_ENV === 'production' ? {} : err,
  });
});

module.exports = routes;
