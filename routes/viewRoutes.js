const express = require('express');
const viewController = require('../controllers/viewController');
const authController = require('../controllers/authController');
const bookingController = require('../controllers/bookingController');

const router = express.Router();

router.get('/account', authController.protect, viewController.getAccount);
router.get(
  '/',
  bookingController.createBookingCheckout,
  authController.isLoggedIn,
  viewController.getOverview
);

router.use(authController.isLoggedIn);

router.get('/forgotPassword', viewController.getForgotPasswordForm);
router.get('/departure/:slug', viewController.getDeparture);
router.get('/login', viewController.getLoginForm);
router.get('/signup', viewController.getSignupForm);
router.get(
  '/my-bookings',
  authController.protect,
  viewController.getMyBookings
);

module.exports = router;
