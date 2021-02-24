const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();

router.route('/signup').post(authController.signup);

router.route('/').get().post();

router.route('/:id').get().patch().delete();

module.exports = router;
