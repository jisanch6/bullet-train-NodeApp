const express = require('express');
const departureController = require('../controllers/departureController');
const authController = require('../controllers/authController');
const reviewRouter = require('./reviewRoutes');

const router = express.Router();

router.use('/:departureId/reviews', reviewRouter);

router
  .route('/')
  .get(departureController.getAllDepartures)
  .post(
    authController.protect,
    authController.restrictTo('admin', 'train-operator'),
    departureController.uploadTourImages,
    departureController.resizeTourImages,
    departureController.createDeparture
  );
router
  .route('/:id')
  .get(departureController.getDeparture)
  .patch(
    authController.protect,
    authController.restrictTo('admin', 'train-operator'),
    departureController.uploadTourImages,
    departureController.resizeTourImages,
    departureController.updateDeparture
  )
  .delete(
    authController.protect,
    authController.restrictTo('admin', 'train-operator'),
    departureController.deleteDeparture
  );

// router
//   .route('/:departureId/reviews')
//   .post(
//     authController.protect,
//     authController.restrictTo('user'),
//     reviewController.createReview
//   );

module.exports = router;
