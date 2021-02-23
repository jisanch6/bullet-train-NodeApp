const path = require('path');
const express = require('express');
const morgan = require('morgan');

const departureRouter = require('./routes/departureRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

//MIDDLEWARE
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  console.log('Hello from the middleware');
  next();
});

//ROUTES
app.use('/api/v1/departures', departureRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;
