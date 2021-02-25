const express = require('express');
const departureController = require('../controllers/departureController');
const authController = require('../controllers/authController');

const router = express.Router();

router
  .route('/')
  .get(departureController.getAllDepartures)
  .post(departureController.createDeparture);
router
  .route('/:id')
  .get(departureController.getDeparture)
  .patch(departureController.updateDeparture)
  .delete(
    authController.protect,
    authController.restrictTo('admin', 'train-operator'),
    departureController.deleteDeparture
  );

module.exports = router;
