const express = require('express');
require('express-async-errors')
const morgan = require('morgan');
const cors = require('cors');
const csurf = require('csurf');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const { ValidationError } = require('sequelize');

// Routes
const routes = require('./routes')

// Checks the enviroment
const { environment } = require('./config');
const isProduction = environment === 'production';

// Initalizes Express application
const app = express()

// Logging information about requests and responses
app.use(morgan('dev'));

// Parses through cookies
app.use(cookieParser());

// to parse through JSON req.body
app.use(express.json());

/*-------------------------- SECURITY MIDDLEWARE --------------------------*/

if (!isProduction) {
  // enable cors only in development
  app.use(cors())
};

// Helmet helps set headers to better secure application
app.use(
  helmet.crossOriginResourcePolicy({
    policy: "cross-origin"
  })
);

// Set the _csrf tokens and create req.csrfToken method
app.use(
  csurf({
    cookie: {
      secure: isProduction,
      sameSite: isProduction && "Lax",
      httpOnly: true
    }
  })
)


app.use(routes);


// Process sequelize errors
app.use((err, _req, _res, next) => {
  // check if error is a Sequelize error:
  if (err instanceof ValidationError) {
    let errors = {};
    for (let error of err.errors) {
      errors[error.path] = error.message;
    }
    err.title = 'Validation error';
    err.errors = errors;
  }
  next(err);
});

// Catch unhandled requests and forward to error handler.
app.use((_req, _res, next) => {
  const err = new Error("The requested resource couldn't be found.");
  err.title = "Resource Not Found";
  err.errors = { message: "The requested resource couldn't be found." };
  err.status = 404;
  next(err);
});

// Error formatter should be the last
app.use((err, _req, res, _next) => {
  res.status(err.status || 500);
  console.error(err);
  res.json({
    title: err.title || 'Server Error',
    message: err.message,
    errors: err.errors,
    stack: isProduction ? null : err.stack
  });
});


module.exports = app;
