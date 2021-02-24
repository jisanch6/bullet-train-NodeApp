const express = require('express');
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);

router.route('/').get(userController.getAllUsers).post();
router.route('/:id').get().patch().delete();

module.exports = router;
