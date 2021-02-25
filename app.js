const path = require('path');
const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const departureRouter = require('./routes/departureRoutes');
const userRouter = require('./routes/userRoutes');
const reviewRouter = require('./routes/reviewRoutes');

const app = express();

//GLOBAL MIDDLEWARE

// Sets special security HTTP headers
// helps against XSS attacks
app.use(helmet());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Use to limit the number of request from a single IP
// can help against brute force attacks, DOS attacks
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour',
});

app.use('/api', limiter);

// Limiting amount of data passed in the body
app.use(express.json({ limit: '10kb' }));

// Data sanitization against NoSQL query injection like { "email": { "$gt": "" }}
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());

//Used to prevent parameter pollution
app.use(
  hpp({
    whitelist: ['sort'],
  })
);

//serves static files
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  console.log('Hello from the middleware');
  next();
});

//ROUTES
app.use('/api/v1/departures', departureRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/reviews', reviewRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 400));
});

app.use(globalErrorHandler);

module.exports = app;
