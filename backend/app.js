const express = require('express');
require('express-async-errors')
const morgan = require('morgan');
const cors = require('cors');
const csurf = require('csurf');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');

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

if(!isProduction){
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


module.exports = app;
