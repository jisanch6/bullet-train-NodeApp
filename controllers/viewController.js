// const jwt = require('jsonwebtoken');
// const crypto = require('crypto');
const Departure = require('../models/departureModel');
// const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

// const signToken = (id) =>
//   jwt.sign({ id }, process.env.JWT_SECRET, {
//     expiresIn: process.env.JWT_EXPIRES_IN,
//   });

// const createSendToken = (user, statusCode, res) => {
//   const token = signToken(user._id);

//   const cookieOptions = {
//     expires: new Date(
//       Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
//     ),
//     httpOnly: true,
//   };

//   if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;

//   res.cookie('jwt', token);

//   //removes password from output of creating new doc
//   user.password = undefined;

//   res.status(statusCode).json({
//     status: 'success',
//     token,
//     data: {
//       user,
//     },
//   });
// };

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

exports.getResetPasswordForm = catchAsync(async (req, res, next) => {
  // // GET user based on the token
  // const hashedToken = crypto
  //   .createHash('sha256')
  //   .update(req.params.token)
  //   .digest('hex');

  // const user = await User.findOne({
  //   passwordResetToken: hashedToken,
  //   passwordResetExpires: { $gt: Date.now() },
  // });
  // // if toke has not EXPIRED, & user exists, set the new password
  // if (!user) {
  //   return next(new AppError('Token is invalid or has expired.', 400));
  // }
  // user.password = req.body.password;
  // user.passwordConfirm = req.body.passwordConfirm;
  // user.passwordResetToken = undefined;
  // user.passwordResetExpires = undefined;
  // await user.save();

  // // Log the user in, send JWT
  // createSendToken(user, 200, res);

  res.status(200).render('resetPassword', {
    title: 'Reset your password',
  });
});
