const Departure = require('../models/departureModel');
const Booking = require('../models/bookingModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.getOverview = catchAsync(async (req, res, next) => {
  const departures = await Departure.find();

  res.status(200).render('overview', {
    title: 'All Departures',
    departures,
  });
});

exports.getDeparture = catchAsync(async (req, res, next) => {
  const departure = await Departure.findOne({ slug: req.params.slug }).populate(
    {
      path: 'reviews',
      fields: 'review rating user',
    }
  );

  if (!departure) {
    return next(new AppError('No departure found with that name.', 404));
  }

  res.status(200).render('departure', {
    title: `Departing to ${departure.name}`,
    departure,
  });
});

exports.getLoginForm = (req, res) => {
  res.status(200).render('login', {
    title: 'Log into your account',
  });
};

exports.getSignupForm = (req, res) => {
  res.status(200).render('signup', {
    title: 'Create your account',
  });
};

exports.getForgotPasswordForm = (req, res) =>
  res.status(200).render('forgotPassword', {
    title: 'Recover your account',
  });

exports.getAccount = (req, res) =>
  res.status(200).render('account', {
    title: 'Your account',
  });

exports.getMyBookings = catchAsync(async (req, res, next) => {
  // Find all bookings
  const bookings = await Booking.find({ user: req.user.id });

  // Find departures with the returned IDs
  const departureIDs = bookings.map((el) => el.departure);
  const departures = await Departure.find({ _id: { $in: departureIDs } });

  res.status(200).render('accountDeparture', {
    title: 'Your bookings',
    departures,
    bookings,
  });
});

exports.getResetPasswordForm = (req, res) => {
  res.status(200).render('resetPassword', {
    title: 'Reset your password',
  });
};
