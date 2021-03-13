const express = require('express');
const viewController = require('../controllers/viewController');
const authController = require('../controllers/authController');
// const userRouter = require('./userRoutes');

const router = express.Router();

// router
//   .route('/resetPassword/:resetToken/users', userRouter)
//   .patch(authController.resetPassword);

// router.get('/users/:token/resetPassword', viewController.getResetPasswordForm);

router.get('/account', authController.protect, viewController.getAccount);

router.use(authController.isLoggedIn);

router.get('/', viewController.getOverview);
router.get('/forgotPassword', viewController.getForgotPasswordForm);
router.get('/departure/:slug', viewController.getDeparture);
router.get('/login', viewController.getLoginForm);
router.get('/signup', viewController.getSignupForm);

module.exports = router;
