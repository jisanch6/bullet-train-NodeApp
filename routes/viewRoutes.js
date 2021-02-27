const express = require('express');
const viewController = require('../controllers/viewController');

const router = express.Router();

router.get('/', viewController.getOverview);
router.get('/departure/:slug', viewController.getDeparture);
router.get('/login', viewController.getLoginForm);
router.get('/signup', viewController.getSignupForm);
router.get('/forgotPassword', viewController.getForgotPasswordForm);

module.exports = router;
