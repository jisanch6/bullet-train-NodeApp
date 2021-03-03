const path = require('path');
const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const departureRouter = require('./routes/departureRoutes');
const userRouter = require('./routes/userRoutes');
const reviewRouter = require('./routes/reviewRoutes');
const viewRouter = require('./routes/viewRoutes');

const app = express();

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

/////GLOBAL MIDDLEWARE
app.use(cors());
// Sets special security HTTP headers
// helps against XSS attacks
app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);

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
app.use(cookieParser());

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
  if (res.locals.token) console.log(res.locals.token);
  console.log(req.originalUrl);
  console.log('Hello from the global middleware');
  next();
});

/////ROUTES
app.use('/', viewRouter);
app.use('/api/v1/departures', departureRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/reviews', reviewRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 400));
});

app.use(globalErrorHandler);

module.exports = app;
