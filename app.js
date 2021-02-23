const express = require('express');
const morgan = require('morgan');

const departureRouter = require('./routes/departureRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

//MIDDLEWARE
app.use(morgan('dev'));

app.use((req, res, next) => {
  console.log('Hello from the middleware');
  next();
});

//ROUTES
app.use('/api/v1/departures', departureRouter);
app.use('/api/v1/users', userRouter);

//START SERVER
const port = 3000;
app.listen(port, () => {
  console.log(`app running on port ${port}`);
});
