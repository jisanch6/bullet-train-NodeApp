const path = require('path');
const express = require('express');
const morgan = require('morgan');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const departureRouter = require('./routes/departureRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

//MIDDLEWARE
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json({ limit: '10kb' }));

app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  console.log('Hello from the middleware');
  next();
});

//ROUTES
app.use('/api/v1/departures', departureRouter);
app.use('/api/v1/users', userRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 400));
});

app.use(globalErrorHandler);

module.exports = app;
