const express = require('express');
const departureController = require('../controllers/departureController');

const router = express.Router();

router
  .route('/')
  .get(departureController.getAllDepartures)
  .post(departureController.createDeparture);
router
  .route('/:id')
  .get(departureController.getDeparture)
  .patch(departureController.updateDeparture)
  .delete(departureController.deleteDeparture);

module.exports = router;
